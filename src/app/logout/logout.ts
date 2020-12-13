import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@/_services';

@Component({
  moduleId: module.id,
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.css']
})

export class Logout implements OnInit {
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }
}
