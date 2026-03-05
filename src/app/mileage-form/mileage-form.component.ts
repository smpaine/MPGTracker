import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, UrlSegment } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Mileage, Vehicle } from '@/models';

import { MileageService, VehicleService } from '@/services';

import { AlertService } from '@/_alert';
import { OnlyNumber } from '@/directives/onlynumber.directive';

@Component({
    selector: 'mileage-form',
    templateUrl: 'mileage-form.component.html',
    styles: [`.btn-cancel{
                margin-left:15px;
              }
                .button-margin {
                margin: 8px;
                }
                `],
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, RouterModule,
        MatCardModule, MatDialogModule, MatFormFieldModule, MatSelectModule,
        MatInputModule, MatIconModule, MatButtonModule,
        MatDatepickerModule, MatNativeDateModule,
        OnlyNumber
    ]
})

export class MileageFormComponent implements OnInit {
    mileageForm: FormGroup<{
        vehicleControl: FormControl<Vehicle>;
        mileageControl: FormControl<number>;
        gallonsControl: FormControl<number>;
        totalCostControl: FormControl<number>;
        mileageDate: FormControl<Date>;
        mileageTime: FormControl<string>;
    }>;

    vid: Number;
    vehicles: Vehicle[];
    selectedVehicle: Vehicle;
    newMileage: Mileage;
    mileageDate: Date;
    mileageId: Number;
    isEditing: boolean;
    saved: boolean;

    constructor(
        private Activatedroute: ActivatedRoute,
        private router: Router,
        private vehicleService: VehicleService,
        private mileageService: MileageService,
        private formBuilder: FormBuilder,
        private alertService: AlertService) {
        this.selectedVehicle = new Vehicle();
        this.newMileage = new Mileage();
        this.mileageDate = new Date();
        this.saved=false;
    }

    ngOnInit() {

        this.mileageForm = this.formBuilder.group({
            vehicleControl: new FormControl(this.selectedVehicle, Validators.required),
            mileageControl: new FormControl<number | null>(null, Validators.required),
            gallonsControl: new FormControl<number | null>(null, Validators.required),
            totalCostControl: new FormControl<number | null>(null, Validators.required),
            mileageDate: new FormControl(this.mileageDate, Validators.required),
            mileageTime: new FormControl(this.toTimeString(this.mileageDate), Validators.required)
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
                this.mileageForm.get('mileageDate').setValue(mileageDate);
                this.mileageForm.get('mileageTime').setValue(this.toTimeString(mileageDate));
                console.debug("mid: " + this.newMileage.id);
            }
            );
        }
    }

    onSave() {
        if (this.mileageForm.valid) {
            this.saved = true;

            let tempMileage: Mileage = new Mileage();

            if (this.isEditing) {
                tempMileage = this.newMileage;
            }

            const selectedVehicle = this.mileageForm.get('vehicleControl').value;
            tempMileage.vid = selectedVehicle.id;
            tempMileage.mileage = this.mileageForm.get('mileageControl').value;
            tempMileage.gallons = this.mileageForm.get('gallonsControl').value;
            tempMileage.totalCost = this.mileageForm.get('totalCostControl').value;

            const dateVal: Date = this.mileageForm.get('mileageDate').value;
            const [hours, minutes] = this.mileageForm.get('mileageTime').value.split(':').map(Number);
            const mileageDate = new Date(dateVal.getFullYear(), dateVal.getMonth(), dateVal.getDate(), hours, minutes);
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

    private toTimeString(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
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