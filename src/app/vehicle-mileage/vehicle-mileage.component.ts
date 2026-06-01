import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Mileage } from '@/models';
import { MileageService } from '@/services';
import { AlertService } from '@/_alert';

@Component({
    selector: 'note-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Mileage Note</h2>
        <mat-dialog-content>
            <p class="note-date">{{ data.timestamp | date:'short' }}</p>
            <p class="note-text">{{ data.notes }}</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Close</button>
        </mat-dialog-actions>
    `,
    styles: [`
        .note-date { color: #888; font-size: 0.85em; margin-bottom: 8px; }
        .note-text { white-space: pre-wrap; }
        mat-dialog-content { min-width: 300px; }
    `]
})
export class NoteDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { notes: string; timestamp: number }) {}
}

@Component({
    selector: 'vehicle-mileage',
    templateUrl: 'vehicle-mileage.component.html',
    styleUrls: ['vehicle-mileage.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule, MatDialogModule]
})

export class VehicleMileageComponent implements OnInit, OnChanges {
    @Input() vid: number;
    mileages: Mileage[];
    errorMessage: string;

    constructor(
        private mileageService: MileageService,
        private alertService: AlertService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        // ngOnChanges is called as soon as we get vehicle list,
        // so we don't need to get mileages here since ngOnChanges
        // will be called immediately
        //this.getMileages(this.vid);
    }

    ngOnChanges(changeRecord: SimpleChanges) {
        if (changeRecord.vid &&
            (changeRecord.vid.previousValue == undefined ||
            changeRecord.vid.previousValue != changeRecord.vid.currentValue)) {
            this.getMileages(changeRecord.vid.currentValue);
        }
    }

    getMileages(vid: number) {
        this.mileageService.list(vid)
            .subscribe(data => this.mileages = data,
            error => this.errorMessage = error);
    }

    openNoteDialog(mileage: Mileage) {
        this.dialog.open(NoteDialogComponent, {
            data: { notes: mileage.notes, timestamp: mileage.timestamp }
        });
    }

    deleteMileage(mileage: Mileage) {
        this.mileageService.delete(mileage.id).subscribe(
            data => {
                // Delete success
                console.debug("Mileage deleted successfully");
                this.alertService.success("Mileage deleted successfully!", {autoClose: true, keepAfterRouteChange: true});
                this.getMileages(mileage.vid);
            },
            error => {
                // Error
                console.error("Delete mileage failed: " + error);
                this.alertService.error("Failed to delete mileage", {autoClose: true, keepAfterRouteChange: true});
            }
        );
    }
}