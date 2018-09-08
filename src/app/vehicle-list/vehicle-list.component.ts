import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../shared/vehicle.service';

@Component({
    moduleId: module.id,
    selector: 'vehicle-list',
    templateUrl: 'vehicle-list.component.html',
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    errorMessage: string;
    selectedVehicle: Vehicle;

    constructor(private vehicleService: VehicleService) {}

    ngOnInit() {
        this.getVehicles();
    }

    getVehicles() {
        this.vehicleService.list()
            .subscribe(data => {
                this.vehicles = data;
                if (this.vehicles && this.vehicles.length > 0) {
                    console.log("Setting selectedVehicle to " + this.vehicles[0].name);
                    this.selectedVehicle = this.vehicles[0];
                } else {
                    console.log("Failing to set selectedVehicle");
                }
            },error => this.errorMessage = error);
    }

    onChange(newSelectedVehicle) {
        console.log("Setting selectedVehicle to " + newSelectedVehicle.name);
        this.selectedVehicle = newSelectedVehicle;
    }
}