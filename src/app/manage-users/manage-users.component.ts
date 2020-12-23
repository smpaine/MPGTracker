import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { UserService } from '@/services';
import { MatTableDataSource } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'manage-users',
    templateUrl: 'manage-users.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class ManageUsersComponent {
    users: User[];
    errorMessage: string;

    usersDataSource: MatTableDataSource<User>;

    displayedColumns: string[] = ['userName', 'lastLoginDt'];

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.list().subscribe(
            data => {
                this.users = data
                this.usersDataSource = new MatTableDataSource(this.users);
            },
            error => this.errorMessage = error
            );
    }
}