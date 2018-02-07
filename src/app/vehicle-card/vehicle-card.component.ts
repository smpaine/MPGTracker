import { Component, Input, Output, EventEmitter, ViewEncapsulation, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';

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
    @Output() edit = new EventEmitter<Vehicle>();
    @Output() delete = new EventEmitter<Vehicle>();
    actionDropdownIsOpen = false;

    constructor(private router: Router) {

    }

    toggleActions() {
        this.actionDropdownIsOpen = !this.actionDropdownIsOpen;
    }

    getDropdownCssClasses() {
        return {
            dropdown: true,
            open: this.actionDropdownIsOpen
        }
    }

    onEdit(vehicle: Vehicle, event) {
        event.preventDefault();
        this.edit.emit(vehicle);
    }

    onDelete(vehicle: Vehicle, event) {
        event.preventDefault();
        this.delete.emit(vehicle);
    }

    onSelect(vehicle: Vehicle, event) {
        event.preventDefault();
        console.log("onSelect: vehicle: " + vehicle);
        this.router.navigate(['/vehicles', vehicle.id]);
    }
}