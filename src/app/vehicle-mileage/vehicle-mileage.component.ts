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
            this.vid = changeRecord.vid.currentValue;
            this.getMileages(this.vid);
        }
    }

    getMileages(vid: number) {
        this.mileageService.list(vid)
            .subscribe(data => this.mileages = data,
            error => this.errorMessage = error);
    }
}