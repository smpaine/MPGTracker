import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

export class MileageFormComponent {
    vid: Number;
    vehicles: Vehicle[];
    selectedVehicle: Vehicle;
    newMileage: Mileage;

    constructor(private Activatedroute: ActivatedRoute, private router: Router, private vehicleService: VehicleService, private mileageService: MileageService) {
        this.vehicles = [];
        this.selectedVehicle = new Vehicle();
        this.newMileage = new Mileage();
    }

    ngOnInit() {
        this.vid = this.Activatedroute.snapshot.params['id'];
        this.vehicleService.SharedList$.subscribe(lst => {
            this.vehicles = lst;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id == this.vid) {
                    this.selectedVehicle = aVehicle;
                    this.newMileage.vid = this.selectedVehicle.id;
                }
            });
        });
        this.vehicleService.getList();
    }

    onSave(mileageForm: NgForm) {
        let tempMileage = Object.assign({}, this.newMileage, mileageForm.value.newMileage);
        console.log("Saving mileage: " + tempMileage);
        this.mileageService.put(tempMileage).subscribe(
            data => {
                // Update success
                console.log("Update successful: " + data);
                this.router.navigate(['/mileages', tempMileage.vid]);
            },
            error => {
                // Error
                console.error("Update failed: " + error);
            }
        );
    }

    hideErrors(modelDirective: NgModel) {
        return (modelDirective.valid || modelDirective.pristine || !modelDirective.touched);
    }

    hideError(modelDirective: NgModel, validationType: any) {
        if (!modelDirective.errors) {
            return true;
        }
        return !modelDirective.errors[validationType];
    }

    setErrorClass(modelDirective: NgModel) {
        let hideError = this.hideErrors(modelDirective);
        return {
            "has-error": !hideError
        }
    }

    onChange(newSelectedVehicle: Vehicle) {
        console.log("Setting selectedVehicle to " + newSelectedVehicle.name);
        newSelectedVehicle.editing = this.selectedVehicle.editing;
        // ensure that editing is set to false if vehicle was in process of being edited
        this.selectedVehicle.editing = false;
        this.selectedVehicle = newSelectedVehicle;
        this.newMileage.vid = this.selectedVehicle.id;
        this.Activatedroute.params['id'] = this.selectedVehicle.id;
    }
}