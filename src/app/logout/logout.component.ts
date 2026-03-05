import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@/_services';

@Component({
  selector: 'logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css'],
  standalone: true
})

export class LogoutComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }
}
