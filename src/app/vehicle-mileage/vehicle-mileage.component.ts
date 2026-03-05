import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Mileage } from '@/models';
import { MileageService } from '@/services';
import { AlertService } from '@/_alert';

@Component({
    selector: 'vehicle-mileage',
    templateUrl: 'vehicle-mileage.component.html',
    styleUrls: ['vehicle-mileage.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule]
})

export class VehicleMileageComponent implements OnInit, OnChanges {
    @Input() vid: number;
    mileages: Mileage[];
    errorMessage: string;

    constructor(private mileageService: MileageService, private alertService: AlertService) { }

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