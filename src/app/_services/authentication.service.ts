import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtResponse, User } from '@/_models';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private tokenName = 'token';

    private sessionUrl = environment.API_URL + "/authenticate";

    private currentTokenSubject: BehaviorSubject<JwtResponse>;
    public currentToken: Observable<JwtResponse>;

    constructor(private http: HttpClient,
        private router: Router) {
        let jwtResponse: JwtResponse = null;
        let localStorageTokean: string = localStorage.getItem(this.tokenName);
        try {
            jwtResponse = JSON.parse(localStorageTokean);
        } catch (error) {
            console.log(`[${error instanceof SyntaxError ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
            localStorage.removeItem(this.tokenName);
        }

        this.currentTokenSubject = new BehaviorSubject<JwtResponse>(jwtResponse);
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): JwtResponse {
        return this.currentTokenSubject.value;
    }

    login(userName: string, password: string) {
        let loginAttempt = new User();
        loginAttempt.userName = userName;
        loginAttempt.password = password;
        return this.http.post<any>(this.sessionUrl, loginAttempt)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.token) {
                    // store jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.tokenName, JSON.stringify(response));
                    this.currentTokenSubject.next(response);
                }

                return response;
            }));
    }

    logout() {
        // remove token from local storage to log user out
        localStorage.removeItem(this.tokenName);
        this.currentTokenSubject.next(null);
        this.router.navigate(['login']);
    }
}