import { Component, OnInit } from '@angular/core';
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

export class Login implements OnInit {
  constructor(public router: Router, public http: Http, private sessionService: SessionService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['mileages']);
    }
  }

  login(event, username, password) {
    event.preventDefault();

    let user = new User;

    user.userName = username;
    user.password = password;

    this.sessionService.login(user).subscribe(
      (responseUser: User) => {
        localStorage.setItem("token", responseUser.token);
        this.router.navigate(['mileages']);
      },
      error => {
        alert("Invalid username/password");
        console.error("Invalid username/password");
      }
    );
  }
}
