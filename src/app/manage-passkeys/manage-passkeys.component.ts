import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PasskeyService } from '@/services/passkey.service';
import { UserService } from '@/services';
import { AlertService } from '@/_alert';

@Component({
    selector: 'manage-passkeys',
    templateUrl: 'manage-passkeys.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, MatTableModule, MatIconModule, MatButtonModule]
})
export class ManagePasskeysComponent implements OnInit {

    userId: number;
    userName: string;
    credentials: any[] = [];
    credentialsDataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['createdDt', 'origin', 'userAgent', 'delete'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private passkeyService: PasskeyService,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.userId = +this.route.snapshot.paramMap.get('userId');
        this.userService.getById(this.userId).subscribe(
            user => this.userName = user.userName,
            error => this.alertService.error('Error loading user: ' + error)
        );
        this.loadCredentials();
    }

    goBack() {
        this.location.back();
    }

    loadCredentials() {
        this.passkeyService.listCredentials(this.userId).subscribe(
            data => {
                this.credentials = data;
                this.credentialsDataSource = new MatTableDataSource(this.credentials);
            },
            error => this.alertService.error('Error loading passkeys: ' + error)
        );
    }

    deleteCredential(credential: any) {
        this.passkeyService.deleteCredential(credential.id).subscribe(
            () => {
                this.credentials = this.credentials.filter(c => c.id !== credential.id);
                this.credentialsDataSource.data = this.credentials;
                this.alertService.success('Passkey deleted successfully');
            },
            error => this.alertService.error('Error deleting passkey: ' + error)
        );
    }
}
