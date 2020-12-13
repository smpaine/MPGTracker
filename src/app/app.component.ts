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

  errorMessage: string;
  displayErrorMessage: boolean = false;

  infoMessage: string;
  displayInfoMessage: boolean = false;

  constructor(private router: Router,
    protected authenticationService: AuthenticationService) {
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
