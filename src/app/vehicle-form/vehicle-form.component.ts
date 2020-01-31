import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Vehicle } from '../shared/vehicle.model';

@Component({
    moduleId: module.id,
    selector: 'vehicle-form',
    templateUrl: 'vehicle-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class VehicleFormComponent implements OnInit {
    @Input() vehicle: Vehicle;
    @Output() cancel = new EventEmitter<Vehicle>();
    @Output() save = new EventEmitter<Vehicle>();

    ngOnInit() {
        //console.debug("incoming vehicle: " + this.vehicle.id);
    }

    onCancel(vehicle: Vehicle, event: Event) {
        event.preventDefault();
        this.cancel.emit(this.vehicle);
    }

    onSave(form: NgForm) {
        let updatedVehicle = Object.assign({}, this.vehicle, form.value.vehicle);

        this.save.emit(updatedVehicle);
    }
}