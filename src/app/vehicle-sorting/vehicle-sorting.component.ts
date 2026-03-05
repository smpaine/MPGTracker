import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { AppComponent } from '@/app.component';

import { AlertService } from '@/_alert';

import { Vehicle } from '@/models';
import { VehicleService } from '@/services';

@Component({
    selector: 'vehicle-sorting',
    templateUrl: 'vehicle-sorting.component.html',
    styleUrls: ['vehicle-sorting.component.css'],
    standalone: true,
    imports: [CommonModule, DragDropModule]
})

export class VehicleSortingComponent implements OnInit {
    vehicles: Vehicle[];

    constructor(public mainApp: AppComponent,
        private vehicleService: VehicleService,
        private activatedroute: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) {
        this.vehicles = [];
    }

    ngOnInit() {
        this.vehicleService.list().subscribe((vehicleList: Vehicle[]) => {
            this.vehicles = vehicleList;
        });
    }

    saveVehicleSortOrder() {
        this.vehicleService.updateVehiclesSortOrder(this.vehicles).subscribe(
            data => {
                // Update success
                console.debug("Update successful: ");
                this.vehicles = data;
                this.alertService.success("Update successful", {autoClose: true, keepAfterRouteChange: true});
            },
            error => {
                // Error
                console.error("Update failed: ");
                console.error(error);
                this.alertService.error("Update failed", {autoClose: true, keepAfterRouteChange: true});
            }
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.vehicles, event.previousIndex, event.currentIndex);
        for (let i = 0; i < this.vehicles.length; i++) {
            //console.debug("i: " + i + ", name: " + this.vehicles[i].name);
            this.vehicles[i].sortkey = i;
        }

        this.saveVehicleSortOrder();
      }
}