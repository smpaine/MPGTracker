import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '@/_services';
import { Vehicle } from '@/models';
import { AlertComponent } from '@/_alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, AlertComponent]
})

export class AppComponent {
  selectedVehicle: Vehicle;

  showingStats: boolean = false;

  constructor(private router: Router,
    public authenticationService: AuthenticationService) {
   }
}
