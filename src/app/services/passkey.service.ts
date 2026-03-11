import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PasskeyService {

  private baseUrl = environment.API_URL + '/passkey';

  constructor(private http: HttpClient) {}

  /**
   * Runs the full passkey authentication flow:
   * 1. Fetches challenge options from the server
   * 2. Invokes the browser WebAuthn API
   * 3. Sends the assertion to the server for verification
   * Returns the JwtResponse (same shape as password login).
   */
  listCredentials(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/credentials/${userId}`);
  }

  deleteCredential(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/credentials/${id}`);
  }

  async authenticate(userName: string): Promise<any> {
    const options = await this.http.get<any>(`${this.baseUrl}/auth/options`, { params: { userName } }).toPromise();

    const publicKeyOptions: PublicKeyCredentialRequestOptions = {
      ...options.publicKey,
      challenge: this.base64UrlToBuffer(options.publicKey.challenge),
      allowCredentials: options.publicKey.allowCredentials?.map((c: any) => ({
        type: c.type,
        id: this.base64UrlToBuffer(c.id)
      })),
      extensions: undefined
    };

    const credential = await navigator.credentials.get({ publicKey: publicKeyOptions }) as PublicKeyCredential;
    if (!credential) throw new Error('No credential returned by authenticator');

    const body = {
      challengeId: options.challengeId,
      credential: this.serializeAssertion(credential)
    };
    return this.http.post<any>(`${this.baseUrl}/auth/verify`, body).toPromise();
  }

  /**
   * Runs the full passkey registration flow for the currently-logged-in user:
   * 1. Fetches creation options from the server (requires JWT)
   * 2. Invokes the browser WebAuthn API to create a credential
   * 3. Sends the attestation to the server to be stored
   */
  async register(): Promise<void> {
    const options = await this.http.get<any>(`${this.baseUrl}/register/options`).toPromise();

    const publicKeyOptions: PublicKeyCredentialCreationOptions = {
      ...options.publicKey,
      challenge: this.base64UrlToBuffer(options.publicKey.challenge),
      user: {
        ...options.publicKey.user,
        id: this.base64UrlToBuffer(options.publicKey.user.id)
      },
      excludeCredentials: options.publicKey.excludeCredentials?.map((c: any) => ({
        type: c.type,
        id: this.base64UrlToBuffer(c.id)
      })),
      // Strip extensions — the library adds appidExclude for U2F compatibility
      // but uses the rpId which is not a valid URL in dev (localhost)
      extensions: undefined
    };

    const credential = await navigator.credentials.create({ publicKey: publicKeyOptions }) as PublicKeyCredential;
    if (!credential) throw new Error('No credential created by authenticator');

    const body = {
      challengeId: options.challengeId,
      credential: this.serializeAttestation(credential)
    };
    await this.http.post<any>(`${this.baseUrl}/register/verify`, body).toPromise();
  }

  private serializeAttestation(credential: PublicKeyCredential): object {
    const response = credential.response as AuthenticatorAttestationResponse;
    return {
      id: credential.id,
      rawId: this.bufferToBase64Url(credential.rawId),
      type: credential.type,
      clientExtensionResults: credential.getClientExtensionResults(),
      response: {
        clientDataJSON: this.bufferToBase64Url(response.clientDataJSON),
        attestationObject: this.bufferToBase64Url(response.attestationObject)
      }
    };
  }

  private serializeAssertion(credential: PublicKeyCredential): object {
    const response = credential.response as AuthenticatorAssertionResponse;
    return {
      id: credential.id,
      rawId: this.bufferToBase64Url(credential.rawId),
      type: credential.type,
      clientExtensionResults: credential.getClientExtensionResults(),
      response: {
        clientDataJSON: this.bufferToBase64Url(response.clientDataJSON),
        authenticatorData: this.bufferToBase64Url(response.authenticatorData),
        signature: this.bufferToBase64Url(response.signature),
        userHandle: response.userHandle ? this.bufferToBase64Url(response.userHandle) : null
      }
    };
  }

  private bufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  private base64UrlToBuffer(base64url: string): ArrayBuffer {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const binary = atob(padded);
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return buffer;
  }
}
