import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { User } from '@/_models';
import { UserService } from '@/services';
import { AlertService } from '@/_alert';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('passwordControl').value;
    const confirm = group.get('confirmPasswordControl').value;
    if (password && confirm && password !== confirm) {
        return { passwordsMismatch: true };
    }
    return null;
}

@Component({
    selector: 'add-user',
    templateUrl: 'add-user.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule,
              MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule]
})

export class AddUserComponent implements OnInit {
    addUserForm: FormGroup<{
        userNameControl: FormControl<string>;
        passwordControl: FormControl<string>;
        confirmPasswordControl: FormControl<string>;
        userTypeControl: FormControl<string>;
    }>;
    saved: boolean = false;

    constructor(
        public router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addUserForm = this.formBuilder.group({
            userNameControl: new FormControl('', Validators.required),
            passwordControl: new FormControl('', Validators.required),
            confirmPasswordControl: new FormControl('', Validators.required),
            userTypeControl: new FormControl('regular', Validators.required)
        }, { validators: passwordsMatchValidator });
    }

    onSave() {
        if (this.addUserForm.valid) {
            this.saved = true;
            const newUser = new User();
            newUser.userName = this.addUserForm.get('userNameControl').value;
            newUser.password = this.addUserForm.get('passwordControl').value;
            newUser.userType = this.addUserForm.get('userTypeControl').value;

            this.userService.add(newUser).subscribe(
                () => {
                    this.alertService.success('User added successfully', { autoClose: true, keepAfterRouteChange: true });
                    this.router.navigate(['/manageUsers']);
                },
                error => {
                    this.saved = false;
                    this.alertService.error('Failed to add user: ' + error);
                }
            );
        }
    }
}
