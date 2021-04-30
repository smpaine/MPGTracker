import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '@/_alert';

import { Vehicle } from '@/models';

import { VehicleService } from '@/services';

@Component({
    moduleId: module.id,
    selector: 'add-vehicle',
    templateUrl: 'add-vehicle.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class AddVehicleComponent {
    newVehicle: Vehicle;

    constructor(
        private router: Router,
        private vehicleService: VehicleService,
        private alertService: AlertService) {
        this.newVehicle = new Vehicle();
        this.newVehicle.editing = true;
    }

    ngOnInit() {
    }

    saveVehicle(vehicle: Vehicle) {
        this.vehicleService.add(vehicle).subscribe(
            (responseVehicle: Vehicle) => {
                this.alertService.success("Vehicle added successfully!", {autoClose: true, keepAfterRouteChange: true});
                // Update success
                if (responseVehicle != undefined) {
                    this.router.navigate(['/mileages', responseVehicle.id]);
                } else {
                    this.router.navigate(['/mileages']);
                }
            },
            error => {
                // Error
                console.error("Update failed: " + error);
                this.alertService.error("Failed to add vehicle", {autoClose: true, keepAfterRouteChange: true});
            }
        );
    }

    cancelAddVehicle(vehicle: Vehicle) {
        this.router.navigate(['/mileages']);
    }
}