import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatCurrency } from '@angular/common';

import { AppComponent } from '../app.component';

import { Vehicle } from '../shared/vehicle.model';
import { Mileage } from '../shared/mileage.model';

import { VehicleService } from '../shared/vehicle.service';
import { MileageService } from '../shared/mileage.service';

@Component({
    moduleId: module.id,
    selector: 'mileage-form',
    templateUrl: 'mileage-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class MileageFormComponent implements OnInit {
    vid: Number;
    vehicles: Vehicle[];
    selectedVehicle: Vehicle;
    newMileage: Mileage;

    constructor(private mainApp: AppComponent,
        private Activatedroute: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private mileageService: MileageService) {
        this.selectedVehicle = new Vehicle();
        this.newMileage = new Mileage();
    }

    ngOnInit() {
        this.vid = this.Activatedroute.snapshot.params['id'];

        this.vehicleService.list().subscribe( (vehicleList: Vehicle[]) => {
            this.vehicles = vehicleList;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id == this.vid) {
                    this.selectedVehicle = aVehicle;
                    this.newMileage.vid = this.selectedVehicle.id;
                }
            });
        });
    }

    onSave(mileageForm: NgForm) {
        let tempMileage = Object.assign({}, this.newMileage, mileageForm.value.newMileage);
        this.mileageService.put(tempMileage).subscribe(
            data => {
                // Update success
                this.mainApp.displayInfo("Mileage added successfully!");
                this.router.navigate(['/mileages', tempMileage.vid]);
            },
            error => {
                // Error
                console.error("Update failed: " + error);
                this.mainApp.displayError("Failed to add mileage");
            }
        );
    }

    onChange(newSelectedVehicle: Vehicle) {
        newSelectedVehicle.editing = this.selectedVehicle.editing;
        // ensure that editing is set to false if vehicle was in process of being edited
        this.selectedVehicle.editing = false;
        this.selectedVehicle = newSelectedVehicle;
        this.newMileage.vid = this.selectedVehicle.id;
        this.vid = this.selectedVehicle.id;
        this.router.navigate(['/addMileage', newSelectedVehicle.id]);
    }
}