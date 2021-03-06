import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from '@/app.component';

import { Mileage, Vehicle } from '@/models';

import { MileageService, VehicleService } from '@/services';

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

    constructor(private mainApp: AppComponent,
        private Activatedroute: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService) {
        this.newVehicle = new Vehicle();
        this.newVehicle.editing = true;
    }

    ngOnInit() {
    }

    saveVehicle(vehicle: Vehicle) {
        this.vehicleService.add(vehicle).subscribe(
            (responseVehicle: Vehicle) => {
                this.mainApp.displayInfo("Vehicle added successfully!");
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
                this.mainApp.displayError("Failed to add vehicle");
            }
        );
    }

    cancelAddVehicle(vehicle: Vehicle) {
        this.router.navigate(['/mileages']);
    }
}