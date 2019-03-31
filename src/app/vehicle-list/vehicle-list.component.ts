import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../shared/vehicle.service';

@Component({
    moduleId: module.id,
    selector: 'vehicle-list',
    templateUrl: 'vehicle-list.component.html',
})

export class VehicleListComponent implements OnInit {
    vid: Number;
    vehicles: Vehicle[];
    errorMessage: string;
    selectedVehicle: Vehicle;

    constructor(private vehicleService: VehicleService, private Activatedroute:ActivatedRoute, private router: Router) {
        this.vehicles = [];
        this.selectedVehicle = new Vehicle();
        this.selectedVehicle.id = 0;
        this.selectedVehicle.editing = false;
    }

    ngOnInit() {
        if (this.Activatedroute.snapshot.params['id'] != undefined) {
            this.vid = this.Activatedroute.snapshot.params['id'];
        }
        this.vehicleService.SharedList$.subscribe(lst => {
            this.vehicles = lst;
            if (this.vehicles != undefined && this.vehicles.length > 0) {
                let found: boolean = false;
                if (this.vid != undefined) {
                    this.vehicles.forEach(aVehicle => {
                        if (aVehicle.id == this.vid) {
                            this.selectedVehicle = aVehicle;
                            found = true;
                        }
                    });
                }
                if (!found) {
                    this.selectedVehicle = this.vehicles[0];
                }
            } else {
                console.error("Failing to set selectedVehicle");
            }
        });
        this.vehicleService.getList();
    }

    toggleVehicleEdit(vehicle: Vehicle) {
        if (vehicle.editing) {
            vehicle.editing = false;
        } else {
            vehicle.editing = true;
        }
    }

    saveVehicle(vehicle: Vehicle) {
        for (var i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].id == vehicle.id) {
                this.vehicles[i].name = vehicle.name;
                this.vehicles[i].make = vehicle.make;
                this.vehicles[i].model = vehicle.model;
                this.vehicles[i].year = vehicle.year;
                this.vehicles[i].purchased = vehicle.purchased;
                this.vehicles[i].editing = false;
                this.vehicleService.put(vehicle).subscribe(
                    data => {
                        // Update success
                        console.debug("Update successful: " + data);
                    },
                    error => {
                        // Error
                        console.error("Update failed: " + error);
                    }
                );
            }
        }
    }

    onChange(newSelectedVehicle: Vehicle) {
        newSelectedVehicle.editing = this.selectedVehicle.editing;
        // ensure that editing is set to false if vehicle was in process of being edited
        this.selectedVehicle.editing = false;
        // navigate to new vehicle so back will work
        this.selectedVehicle = newSelectedVehicle;
        //this.Activatedroute.params['id'] = this.selectedVehicle.id;
        this.vid = this.selectedVehicle.id;
        this.router.navigate(['/mileages', newSelectedVehicle.id]);
    }
}