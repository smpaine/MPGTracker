import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../shared/vehicle.model';
import { Mileage } from '../shared/mileage.model';

import { VehicleService } from '../shared/vehicle.service';
import { MileageService } from '../shared/mileage.service';

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

    constructor(private Activatedroute: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {
        this.newVehicle = new Vehicle();
        this.newVehicle.editing = true;
    }

    ngOnInit() {
    }

    saveVehicle(vehicle: Vehicle) {
        console.log("Saving vehicle: " + vehicle.id);
        console.log("Adding vehicle");
        this.vehicleService.add(vehicle).subscribe(
            (responseVehicle: Vehicle) => {
                // Update success
                console.log("Update successful: ");
                console.log(responseVehicle);
                this.vehicleService.getList();
                if (responseVehicle != undefined) {
                    this.router.navigate(['/mileages', responseVehicle.id]);
                } else {
                    this.router.navigate(['/mileages']);
                }
            },
            error => {
                // Error
                console.error("Update failed: " + error);
            }
        );
    }

    cancelAddVehicle(vehicle: Vehicle) {
        this.router.navigate(['/mileages']);
    }
}