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

    constructor(private vehicleService: VehicleService, private Activatedroute: ActivatedRoute, private router: Router) {
        this.vehicles = [];
        this.selectedVehicle = new Vehicle();
        this.selectedVehicle.id = 0;
        this.selectedVehicle.editing = false;
    }

    ngOnInit() {
        if (this.Activatedroute.snapshot.params['id'] != undefined) {
            this.vid = this.Activatedroute.snapshot.params['id'];
        }

        let temp: string = localStorage.getItem(this.vehicleService.localStorageName);

        if (temp != undefined && temp.length > 0) {
            this.vehicles = JSON.parse(temp);
            this.setSelectedVehicle()
        } else {
            this.vehicles = this.vehicleService.getList();
            this.setSelectedVehicle();
        }        
    }

    private setSelectedVehicle() {
        if (this.vehicles != undefined && this.vid != undefined) {
            let foundVehicle: boolean = false;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id == this.vid) {
                    this.selectedVehicle = aVehicle;
                    foundVehicle = true;
                }
            });

            if (!foundVehicle) {
                this.selectedVehicle = this.vehicles[0];
            }
        } else if (this.vehicles != undefined) {
            this.selectedVehicle = this.vehicles[0];
            this.vid = this.selectedVehicle.id;
        } else if (this.vid != undefined) {
            console.error("setSelectedVehicle: this.vehicles is undefined, this.vid = " + this.vid);
        } else {
            console.error("setSelectedVehicle: this.vehicles is undefined, this.vid is undefined");
        }
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
        this.selectedVehicle = newSelectedVehicle;
        this.vid = this.selectedVehicle.id;
        this.router.navigate(['/mileages', newSelectedVehicle.id]);
    }
}