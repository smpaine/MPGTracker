import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Vehicle } from '../shared/vehicle.model';

@Component({
    moduleId: module.id,
    selector: 'vehicle-form',
    templateUrl: 'vehicle-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class VehicleFormComponent {
    @Input() vehicle: Vehicle;
    @Output() cancel = new EventEmitter<Vehicle>();
    @Output() save = new EventEmitter<Vehicle>();

    onCancel(vehicle, event) {
        event.preventDefault();
        this.cancel.emit(this.vehicle);
    }

    onSave(form) {
        let updatedVehicle = Object.assign({}, this.vehicle, form.value.vehicle);

        this.save.emit(updatedVehicle);
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