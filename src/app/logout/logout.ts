import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from '../shared/user.model';
import { SessionService } from '../shared/session.service';

@Component({
  moduleId: module.id,
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.css']
})

export class Logout {
  constructor(public router: Router, public http: Http, private sessionService: SessionService) {
    let user = new User;

    user.token = localStorage.getItem("token");

    this.sessionService.logout(user).subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['login']);
      },
      error => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    );
  }
}
