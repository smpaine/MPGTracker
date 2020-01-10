import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from './common/auth.guard'

import { Vehicle } from './shared/vehicle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedVehicle: Vehicle;

  errorMessage: string;
  displayErrorMessage: boolean = false;

  infoMessage: string;
  displayInfoMessage: boolean = false;

  constructor(private router: Router, private auth: AuthGuard) {
   }

   public displayError(errorMessage: string) {
     this.errorMessage = errorMessage;
     this.displayErrorMessage = true;
   }

   public displayInfo(infoMessage: string) {
     this.infoMessage = infoMessage;
     this.displayInfoMessage = true;
   }
}
