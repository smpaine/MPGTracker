import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AppComponent } from '@/app.component';
import { AuthenticationService } from '@/_services';
import { PasskeyService } from '@/services/passkey.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }>;
  submitted = false;
  loading = false;
  error = '';
  passkeySupported = typeof window !== 'undefined' && !!window.PublicKeyCredential;

  constructor(private mainApp: AppComponent,
    private router: Router,
    private authenticationService: AuthenticationService,
    private passkeyService: PasskeyService,
    private formBuilder: FormBuilder,
  ) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['mileages']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          this.router.navigate(['mileages']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  async loginWithPasskey() {
    this.loading = true;
    this.error = '';
    try {
      const jwtResponse = await this.passkeyService.authenticate();
      this.authenticationService.storeToken(jwtResponse);
      this.router.navigate(['mileages']);
    } catch (err) {
      console.error('Passkey authentication error:', err);
      this.error = 'Passkey authentication failed: ' + (err as Error).message;
      this.loading = false;
    }
  }
}
