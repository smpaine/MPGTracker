import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { UserService } from '@/services';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@/_services';
import { AlertService } from '@/_alert';

@Component({
    selector: 'manage-users',
    templateUrl: 'manage-users.component.html',
    styleUrls: ['manage-users.component.css'],
})

export class ManageUsersComponent {
    currentUserId: number;
    users: User[];

    usersDataSource: MatTableDataSource<User>;

    displayedColumns: string[] = ['userName', 'lastLoginDt', 'editUser', 'deleteUser'];

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.currentUserId = this.authenticationService.currentTokenValue.id;
        this.userService.list().subscribe(
            data => {
                this.users = data
                this.usersDataSource = new MatTableDataSource(this.users);
            },
            error => {
                this.alertService.error('Manage Users error: ' + error);
            }
            );
    }

    deleteUser(user: User) {
        console.debug('Delete user called for user: ' + user.id);
    }
}