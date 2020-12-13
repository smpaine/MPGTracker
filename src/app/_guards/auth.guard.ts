import { AuthenticationService } from '@/_services';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() {
    const currentToken = this.authenticationService.currentTokenValue;
    if (currentToken) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
