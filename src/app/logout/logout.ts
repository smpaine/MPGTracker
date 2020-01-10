import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AuthGuard } from '../common/auth.guard';

import { User } from '../shared/user.model';
import { SessionService } from '../shared/session.service';

@Component({
  moduleId: module.id,
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.css']
})

export class Logout implements OnInit {
  constructor(private router: Router,
    private http: Http,
    private sessionService: SessionService,
    private auth: AuthGuard) { }

  ngOnInit() {
    let user = new User;

    user.token = localStorage.getItem("token");

    this.sessionService.logout(user).subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['login']);
        this.auth.loggedIn = false;
      },
      error => {
        localStorage.clear();
        this.router.navigate(['login']);
        this.auth.loggedIn = false;
      }
    );
  }
}
