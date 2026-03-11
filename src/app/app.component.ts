import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from '@/_services';
import { PasskeyService } from '@/services/passkey.service';
import { Vehicle } from '@/models';
import { AlertComponent, AlertService } from '@/_alert';

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

  passkeySupported = typeof window !== 'undefined' && !!window.PublicKeyCredential;

  constructor(private router: Router,
    public authenticationService: AuthenticationService,
    private passkeyService: PasskeyService,
    private alertService: AlertService) {
  }

  async registerPasskey() {
    try {
      await this.passkeyService.register();
      this.alertService.success('Passkey registered successfully.');
    } catch (err) {
      console.error('Passkey registration error:', err);
      if ((err as DOMException).name === 'InvalidStateError') {
        this.alertService.error('A passkey is already registered on this device. Delete it under Manage Passkeys before registering again.');
      } else {
        this.alertService.error('Passkey registration failed: ' + (err as Error).message);
      }
    }
  }
}
