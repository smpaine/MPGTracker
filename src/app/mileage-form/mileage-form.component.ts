import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { Mileage, Vehicle } from '@/models';

import { MileageService, VehicleService } from '@/services';

import { AlertService } from '@/_alert';

@Component({
    moduleId: module.id,
    selector: 'mileage-form',
    templateUrl: 'mileage-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
                `]
})

export class MileageFormComponent implements OnInit {
    mileageForm: FormGroup;

    vid: Number;
    vehicles: Vehicle[];
    selectedVehicle: Vehicle;
    newMileage: Mileage;
    mileageDate: Date;
    mileageId: Number;
    isEditing: boolean;

    constructor(
        private Activatedroute: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private mileageService: MileageService,
        private fb: FormBuilder,
        private alertService: AlertService) {
        this.selectedVehicle = new Vehicle();
        this.newMileage = new Mileage();
        this.mileageDate = new Date();
    }

    ngOnInit() {

        this.mileageForm = this.fb.group({
            vehicleControl: [this.selectedVehicle, Validators.required],
            mileageControl: ['', Validators.required],
            gallonsControl: ['', Validators.required],
            totalCostControl: ['', Validators.required],
            mileageDateTime: [this.mileageDate, Validators.required]
        });

        if (this.Activatedroute.snapshot.routeConfig.path.indexOf('editMileage') >= 0) {
            this.isEditing = true;
            this.mileageId = this.vid = this.Activatedroute.snapshot.params['mid'];
        } else {
            this.isEditing = false;
        }

        this.vid = this.Activatedroute.snapshot.params['vid'];

        console.debug(this.isEditing);
        console.debug(this.vid);
        console.debug(this.mileageId);

        this.vehicleService.list().subscribe( (vehicleList: Vehicle[]) => {
            this.vehicles = vehicleList;
            this.vehicles.forEach(aVehicle => {
                if (aVehicle.id == this.vid) {
                    this.selectedVehicle = aVehicle;
                    this.newMileage.vid = this.selectedVehicle.id;
                    console.debug('Setting selectedVehicle to ' + this.selectedVehicle.name);
                    this.mileageForm.get('vehicleControl').setValue(this.selectedVehicle);
                }
            });
        });

        if (this.isEditing) {
            this.mileageService.get(this.mileageId).subscribe( (aMileage: Mileage) => {
                this.newMileage = aMileage;
                this.mileageForm.get('mileageControl').setValue(this.newMileage.mileage);
                this.mileageForm.get('gallonsControl').setValue(this.newMileage.gallons);
                this.mileageForm.get('totalCostControl').setValue(this.newMileage.totalCost);
                const mileageDate = new Date(this.newMileage.timestamp);
                console.debug(mileageDate);
                this.mileageForm.get('mileageDateTime').setValue(mileageDate);
                console.debug("mid: " + this.newMileage.id);
            }
            );
        }
    }

    onSave() {
        if (this.mileageForm.valid) {

            let tempMileage: Mileage = new Mileage();

            if (this.isEditing) {
                tempMileage = this.newMileage;
            }

            const selectedVehicle = this.mileageForm.get('vehicleControl').value;
            tempMileage.vid = selectedVehicle.id;
            tempMileage.mileage = this.mileageForm.get('mileageControl').value;
            tempMileage.gallons = this.mileageForm.get('gallonsControl').value;
            tempMileage.totalCost = this.mileageForm.get('totalCostControl').value;

            const mileageDate = new Date(this.mileageForm.get('mileageDateTime').value);
            console.debug(mileageDate);
            console.debug(mileageDate.getTime());
            tempMileage.timestamp = mileageDate.getTime();

            if (this.isEditing) {
                console.debug("mid: " + tempMileage.id);
                this.mileageService.put(tempMileage).subscribe(
                    data => {
                        // Update success
                        console.debug("Mileage updated successfully");
                        this.alertService.success("Mileage updated successfully!", {autoClose: true, keepAfterRouteChange: true});
                        this.router.navigate(['/mileages', tempMileage.vid]);
                    },
                    error => {
                        // Error
                        console.error("Update failed: " + error);
                        this.alertService.error("Failed to add mileage", {autoClose: true, keepAfterRouteChange: true});
                    }
                );
            } else {
                this.mileageService.put(tempMileage).subscribe(
                    data => {
                        // Update success
                        console.debug("Mileage added successfully");
                        this.alertService.success("Mileage added successfully!", {autoClose: true, keepAfterRouteChange: true});
                        this.router.navigate(['/mileages', tempMileage.vid]);
                    },
                    error => {
                        // Error
                        console.error("Update failed: " + error);
                        this.alertService.error("Failed to add mileage", {autoClose: true, keepAfterRouteChange: true});
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
        this.newMileage.vid = this.selectedVehicle.id;
        this.vid = this.selectedVehicle.id;
        if (!this.isEditing) {
            this.router.navigate(['/addMileage', newSelectedVehicle.id]);
        }
    }
}