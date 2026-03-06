import { AuthenticationService } from '@/_services';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentToken = this.authenticationService.currentTokenValue;
    if (currentToken) {
      const url = route.url.toString();
      if (url.indexOf('manageUsers') >= 0 || url.indexOf('addUser') >= 0) {
        if (currentToken.userType === 'administrator') {
          return true;
        } else {
          return false;
        }
      } else {
        //console.debug('url: ' + route.url.toString());
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
