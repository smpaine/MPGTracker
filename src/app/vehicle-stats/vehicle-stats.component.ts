import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { VehicleStats } from '@/models';
import { MileageService } from '@/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'vehicle-stats',
    templateUrl: 'vehicle-stats.component.html',
    styleUrls: ['vehicle-stats.component.css']
})

export class VehicleStatsComponent implements OnInit, OnChanges {
    @Input() vid: number;
    stats: VehicleStats[];
    errorMessage: string;

    constructor(private mileageService: MileageService,
        private activatedroute: ActivatedRoute) { }

    ngOnInit() {
        if (this.activatedroute.snapshot.params['id'] !== undefined) {
            this.vid = this.activatedroute.snapshot.params['id'];
            this.getStats(this.vid);
        }
    }

    ngOnChanges(changeRecord: SimpleChanges) {
        if (changeRecord.vid && changeRecord.vid.currentValue !== undefined &&
            (changeRecord.vid.previousValue == undefined ||
            changeRecord.vid.previousValue != changeRecord.vid.currentValue)) {
            this.getStats(changeRecord.vid.currentValue);
        }
    }

    getStats(vid: number) {
        this.mileageService.getStats(vid)
            .subscribe(data => this.stats = data,
            error => this.errorMessage = error);
    }
}