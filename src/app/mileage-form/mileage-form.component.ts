import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Vehicle } from '../shared/vehicle.model';
import { Mileage } from '../shared/mileage.model';

import { VehicleService } from '../shared/vehicle.service';

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
    vehicle: Vehicle;

    constructor(private Activatedroute:ActivatedRoute, private vehicleService: VehicleService) {
        this.vehicles = [];
        this.vehicle = new Vehicle();
    }

    ngOnInit() {
        this.vid=this.Activatedroute.snapshot.params['id'];
        this.vehicleService.SharedList$.subscribe(lst => {
            this.vehicles = lst;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id ==this.vid) {
                    this.vehicle = aVehicle;
                }
            });
        });
        this.vehicleService.getList();
        
    }

    onSubmit(form) {

    }

    onCancel(form) {
        
    }

    hideErrors(modelDirective) {
        return(modelDirective.valid || modelDirective.pristine || !modelDirective.touched);
    }

    hideError(modelDirective, validationType) {
        if (!modelDirective.errors) {
            return true;
        }
        return !modelDirective.errors[validationType];
    }

    setErrorClass(modelDirective) {
        let hideError = this.hideErrors(modelDirective);
        return {
            "has-error": !hideError
        }
    }
}