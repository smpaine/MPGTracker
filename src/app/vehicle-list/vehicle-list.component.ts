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

    constructor(private vehicleService: VehicleService) {}

    ngOnInit() {
        this.getVehicles();
    }

    getVehicles() {
        this.vehicleService.list()
            .subscribe(data => this.vehicles = data,
                error => this.errorMessage = error);
    }

    onEdit(vehicle) {
        vehicle.editing = true;
    }

    onCancel(vehicle) {
        vehicle.editing = false;
    }

    onSave(vehicle) {
        vehicle.editing = false;
        this.vehicleService.put(vehicle)
            .subscribe( p => {
                    let index = this.vehicles.findIndex(p=> p.id == vehicle.id);
                    this.vehicles[index] = vehicle;
            },
            error=> this.errorMessage = error);
    }

    onDelete(vehicle) {
        this.vehicleService
            .delete(vehicle)
            .subscribe(()=>this.vehicles = this.vehicles.filter(p=> p.id != vehicle.id)
                , (error)=>this.errorMessage = error)
    }
}