import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from '@/app.component';
import { Vehicle } from '@/models';
import { VehicleService } from '@/services';

@Component({
    moduleId: module.id,
    selector: 'vehicle-list',
    templateUrl: 'vehicle-list.component.html',
    styleUrls: ['vehicle-list.component.css'],
})

export class VehicleListComponent implements OnInit {
    vid: Number;
    vehicles: Vehicle[];

    constructor(public mainApp: AppComponent,
        private vehicleService: VehicleService,
        private Activatedroute: ActivatedRoute,
        private router: Router) {
        this.vehicles = [];
    }

    ngOnInit() {
        if (this.Activatedroute.snapshot.params['id'] != undefined) {
            this.vid = this.Activatedroute.snapshot.params['id'];
        }

        this.vehicleService.list().subscribe( (vehicleList: Vehicle[]) => {
            this.vehicles = vehicleList;
            this.setSelectedVehicle();
        });
    }

    private setSelectedVehicle() {
        if (this.vehicles != undefined && this.vid != undefined) {
            let foundVehicle: boolean = false;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id == this.vid) {
                    this.mainApp.selectedVehicle = aVehicle;
                    foundVehicle = true;
                }
            });

            if (!foundVehicle) {
                this.mainApp.selectedVehicle = this.vehicles[0];
            }
        } else if (this.vehicles != undefined) {
            this.mainApp.selectedVehicle = this.vehicles[0];
            this.vid = this.mainApp.selectedVehicle.id;
        } else if (this.vid != undefined) {
            console.error("setSelectedVehicle: this.vehicles is undefined, this.vid = " + this.vid);
            this.mainApp.displayError("setSelectedVehicle: this.vehicles is undefined, this.vid = " + this.vid);
        } else {
            console.error("setSelectedVehicle: this.vehicles is undefined, this.vid is undefined");
            this.mainApp.displayError("setSelectedVehicle: this.vehicles is undefined, this.vid is undefined");
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
                this.vehicleService.update(vehicle).subscribe(
                    data => {
                        // Update success
                        console.debug("Update successful: ");
                        console.debug(data);
                        this.mainApp.displayInfo("Update successful");
                    },
                    error => {
                        // Error
                        console.error("Update failed: ");
                        console.error(error);
                        this.mainApp.displayError("Update failed");
                    }
                );
            }
        }
    }

    onChange(newSelectedVehicle: Vehicle) {
        newSelectedVehicle.editing = this.mainApp.selectedVehicle.editing;
        // ensure that editing is set to false if vehicle was in process of being edited
        this.mainApp.selectedVehicle.editing = false;
        this.mainApp.selectedVehicle = newSelectedVehicle;
        this.vid = this.mainApp.selectedVehicle.id;
        this.router.navigate(['/mileages', newSelectedVehicle.id]);
    }
}