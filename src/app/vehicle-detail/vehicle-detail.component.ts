import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

import { Vehicle } from "../shared/vehicle.model";
import { VehicleService } from "../shared/vehicle.service";

@Component({
    moduleId : module.id,
    selector: 'vehicle-detail',
    templateUrl: 'vehicle-detail.component.html',
})

export class VehicleDetailComponent implements OnInit, OnDestroy{
    vehicle: Vehicle;
    errorMessage: string;
    subscription: any;
    paramsSubscription: any;

    constructor(private vehicleService: VehicleService, private route: ActivatedRoute){}

    ngOnInit(){
        this.getVehicle();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    getVehicle() {
        this.paramsSubscription = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.subscription = this.vehicleService
                    .find(id)
                    .subscribe((p)=>this.vehicle = p,
                        (e)=> this.errorMessage = e);
            }
        });
    }
}
