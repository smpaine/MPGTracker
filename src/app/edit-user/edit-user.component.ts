import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '@/_models';
import { UserService } from '@/services';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@/_services';
import { AlertService } from '@/_alert';

@Component({
    moduleId: module.id,
    selector: 'edit-user',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.css'],
})

export class EditUserComponent {
    currentUserId: number;
    user: User;
    errorMessage: string;

    displayedColumns: string[] = ['userName', 'lastLoginDt', 'editUser', 'deleteUser'];

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private activatedroute: ActivatedRoute,
        private alertService: AlertService
    ) {
        this.user = new User();
    }

    ngOnInit() {
        if (this.activatedroute.snapshot.params['id'] != undefined) {
            this.currentUserId = this.activatedroute.snapshot.params['id'];
            console.debug('editUser id: ' + this.currentUserId);
        } else {
            console.debug('editUser id: <null>');
        }

        this.userService.getById(this.currentUserId).subscribe(
            data => {
                this.user = data;
            },
            error => {
                this.alertService.error('Manage Users error: ' + error);
            }
        );
    }

}