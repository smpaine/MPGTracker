import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  public loggedIn: boolean = false;

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      return true;
    }

    this.router.navigate(['/login']);
    this.loggedIn = false;
    return false;
  }
}
