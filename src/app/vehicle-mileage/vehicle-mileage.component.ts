import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Mileage } from '../shared/mileage.model';
import { MileageService } from '../shared/mileage.service';

@Component({
    moduleId: module.id,
    selector: 'vehicle-mileage',
    templateUrl: 'vehicle-mileage.component.html',
    styleUrls: ['vehicle-mileage.component.css']
})

export class VehicleMileageComponent implements OnInit, OnChanges {
    @Input() vid: number;
    mileages: Mileage[];
    errorMessage: string;

    constructor(private mileageService: MileageService) { }

    ngOnInit() {
        // ngOnChanges is called as soon as we get vehicle list,
        // so we don't need to get mileages here since ngOnChanges
        // will be called immediately
        //this.getMileages(this.vid);
    }

    ngOnChanges(changeRecord: SimpleChanges) {
        if (changeRecord.vid &&
            (changeRecord.vid.previousValue == undefined ||
            changeRecord.vid.previousValue != changeRecord.vid.currentValue)) {
            this.getMileages(changeRecord.vid.currentValue);
        }
    }

    getMileages(vid: number) {
        this.mileageService.list(vid)
            .subscribe(data => this.mileages = data,
            error => this.errorMessage = error);
    }
}