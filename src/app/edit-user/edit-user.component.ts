import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    selector: 'edit-user',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule,
              MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule]
})

export class EditUserComponent implements OnInit {
    editUserForm: FormGroup<{
        userNameControl: FormControl<string>;
        passwordControl: FormControl<string>;
        confirmPasswordControl: FormControl<string>;
    }>;
    user: User;
    saved: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private activatedroute: ActivatedRoute,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this.editUserForm = this.formBuilder.group({
            userNameControl: new FormControl('', Validators.required),
            passwordControl: new FormControl(''),
            confirmPasswordControl: new FormControl('')
        }, { validators: passwordsMatchValidator });

        const id = this.activatedroute.snapshot.params['id'];
        if (id != undefined) {
            this.userService.getById(id).subscribe(
                data => {
                    this.user = data;
                    this.editUserForm.get('userNameControl').setValue(this.user.userName);
                },
                error => {
                    this.alertService.error('Error loading user: ' + error);
                }
            );
        }
    }

    onSave() {
        if (this.editUserForm.valid) {
            this.saved = true;
            this.user.userName = this.editUserForm.get('userNameControl').value;
            const newPassword = this.editUserForm.get('passwordControl').value;
            if (newPassword) {
                this.user.password = newPassword;
            }
            this.userService.update(this.user).subscribe(
                () => {
                    this.alertService.success('User updated successfully', { autoClose: true, keepAfterRouteChange: true });
                    this.router.navigate(['/manageUsers']);
                },
                error => {
                    this.saved = false;
                    this.alertService.error('Failed to update user: ' + error);
                }
            );
        }
    }
}