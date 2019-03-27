import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../shared/vehicle.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

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

    toggleVehicleEdit(vehicle: Vehicle) {
        if (vehicle.editing) {
            vehicle.editing = false;
        } else {
            vehicle.editing = true;
        }
    }

    saveVehicle(vehicle: Vehicle) {
        console.log("Saving vehicle: " + vehicle.id);
        for (var i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].id == vehicle.id) {
                this.vehicles[i].name = vehicle.name;
                this.vehicles[i].editing = false;
                console.log("Putting vehicle");
                return this.vehicleService.put(vehicle);
            }
        }
    }

    onChange(newSelectedVehicle: Vehicle) {
        console.log("Setting selectedVehicle to " + newSelectedVehicle.name);
        newSelectedVehicle.editing = this.selectedVehicle.editing;
        // ensure that editing is set to false if vehicle was in process of being edited
        this.selectedVehicle.editing = false;
        this.selectedVehicle = newSelectedVehicle;
    }
}