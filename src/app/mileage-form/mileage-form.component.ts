import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Vehicle } from '../shared/vehicle.model';
import { Mileage } from '../shared/mileage.model';

@Component({
    moduleId: module.id,
    selector: 'mileage-form',
    templateUrl: 'mileage-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class MileageFormComponent {
    @Input() vehicle: Vehicle;

    ngOnInit() {
        
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