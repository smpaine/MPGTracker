import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { UserService } from '@/services';
import { MatTableDataSource } from '@angular/material';
import { AuthenticationService } from '@/_services';

@Component({
    moduleId: module.id,
    selector: 'manage-users',
    templateUrl: 'manage-users.component.html',
    styleUrls: ['manage-users.component.css'],
})

export class ManageUsersComponent {
    currentUserId: number;
    users: User[];
    errorMessage: string;

    usersDataSource: MatTableDataSource<User>;

    displayedColumns: string[] = ['userName', 'lastLoginDt', 'editUser', 'deleteUser'];

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.currentUserId = this.authenticationService.currentTokenValue.id;
        this.userService.list().subscribe(
            data => {
                this.users = data
                this.usersDataSource = new MatTableDataSource(this.users);
            },
            error => this.errorMessage = error
            );
    }

    deleteUser(user: User) {
        console.debug('Delete user called for user: ' + user.id);
    }
}