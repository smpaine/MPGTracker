import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Mileage } from '../shared/mileage.model';
import { MileageService } from '../shared/mileage.service';

@Component({
    moduleId: module.id,
    selector: 'vehicle-mileage',
    templateUrl: 'vehicle-mileage.component.html',
})

export class VehicleMileageComponent implements OnInit {
    @Input() vid: number;
    mileages: Mileage[];
    errorMessage: string;

    constructor(private mileageService: MileageService) { }

    ngOnInit() {
        this.getMileages(this.vid);
    }

    ngOnChanges(changeRecord: SimpleChanges) {
        if (changeRecord.vid) {
            console.log('vid = ', changeRecord.vid.currentValue);
            this.vid = changeRecord.vid.currentValue;
            this.getMileages(this.vid);
        }
    }

    getMileages(vid: number) {
        this.mileageService.list(vid)
            .subscribe(data => this.mileages = data,
            error => this.errorMessage = error);
    }

    onEdit(mileage) {
        mileage.editing = true;
    }

    onCancel(mileage) {
        mileage.editing = false;
    }

    onSave(mileage) {
        mileage.editing = false;
        this.mileageService.put(mileage)
            .subscribe(p => {
                let index = this.mileages.findIndex(p => p.id == mileage.id);
                this.mileages[index] = mileage;
            },
            error => this.errorMessage = error);
    }

    onDelete(mileage) {
        this.mileageService
            .delete(mileage)
            .subscribe(() => this.mileages = this.mileages.filter(p => p.id != mileage.id)
            , (error) => this.errorMessage = error)
    }
}