import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';

@Component({
    moduleId: module.id,
    selector: 'change-password',
    templateUrl: 'change-password.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class ChangePasswordComponent {
    user: User;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
    }
}