import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from '../common/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.css']
})

export class Logout implements OnInit {
  constructor(private router: Router,
    private auth: AuthGuard) { }

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.auth.loggedIn = false;
  }
}
