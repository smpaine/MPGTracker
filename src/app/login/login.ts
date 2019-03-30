import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../shared/user.model';
import { SessionService } from '../shared/session.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})

export class Login {
  constructor(public router: Router, public http: Http, private sessionService: SessionService) {
  }

  login(event, username, password) {
    event.preventDefault();

    let user = new User;

    user.userName = username;
    user.password = password;

    this.sessionService.login(user).subscribe(
      (responseUser: User) => {
        console.log(responseUser);
        localStorage.setItem("token", responseUser.token);
        this.router.navigate(['mileages']);
      },
      error => {
        alert("Invalid username/password");
        console.log("Invalid username/password");
      }
    );
  }
}
