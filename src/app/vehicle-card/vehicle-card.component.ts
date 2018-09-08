import { Component, Input, Output, EventEmitter, ViewEncapsulation, enableProdMode } from '@angular/core';

import { Vehicle } from '../shared/vehicle.model';

@Component({
    moduleId: module.id,
    selector: 'vehicle-card',
    templateUrl: 'vehicle-card.component.html',
    styleUrls: ['vehicle-card.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})

export class VehicleCardComponent {
    @Input() vehicle: Vehicle;
    displayingMileage = false;

    showMileage(vehicle: Vehicle, event) {
        event.preventDefault();
        this.displayingMileage = true;
    }

    hideMileage(vehicle: Vehicle, event) {
        event.preventDefault();
        this.displayingMileage = false;
    }
}