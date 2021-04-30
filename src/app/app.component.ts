import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@/_services';
import { Vehicle } from '@/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedVehicle: Vehicle;

  constructor(private router: Router,
    public authenticationService: AuthenticationService) {
   }
}
