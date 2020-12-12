import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../shared/user.model';

import { AppComponent } from '../app.component';

import { AuthGuard } from '../common/auth.guard';

import { SessionService } from '../shared/session.service';
import { JwtResponse } from 'app/shared/JwtResponse.model';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})

export class Login implements OnInit {
  constructor(private mainApp: AppComponent,
    private router: Router,
    private http: Http,
    private sessionService: SessionService,
    private auth: AuthGuard) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['mileages']);
    }
  }

  login(event: Event, username: string, password: string) {
    event.preventDefault();

    let user = new User;

    user.userName = username;
    user.password = password;

    this.sessionService.login(user).subscribe(
      (responseToken: JwtResponse) => {
        localStorage.setItem("token", responseToken.token);
        this.auth.loggedIn = true;
        this.router.navigate(['mileages']);
      },
      error => {
        this.mainApp.displayError("Invalid username/password");
        console.error("Invalid username/password");
      }
    );
  }
}
