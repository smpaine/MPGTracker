import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AppComponent } from '@/app.component';
import { AuthenticationService } from '@/_services';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})

export class Login implements OnInit {
  private loginForm: FormGroup;
  private submitted = false;
  private loading = false;
  private error = '';

  constructor(private mainApp: AppComponent,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['mileages']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
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
}
