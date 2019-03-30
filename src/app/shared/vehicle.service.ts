import { Injectable, OnInit } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Vehicle } from "./vehicle.model";

import { commonHeaders } from "../common/headers";

@Injectable()
export class VehicleService implements OnInit {
    private vehiclesUrl = "https://nameniap.com/spaine/MPGTracker/services/vehicles/";

    SharedList$: Observable<Vehicle[]>;
    private listObserver: Observer<Vehicle[]>;

    private sharedList: Vehicle[];

    constructor(private http: Http) {
        this.sharedList = [];
        this.SharedList$ = new Observable<Vehicle[]>(x => this.listObserver = x).share();
    }

    ngOnInit() {

    }

    getList() {
        this.list()
        .subscribe(newVehicles => {
            console.log("in vehicleService updateVehicles - got data");
            this.sharedList = newVehicles;
                this.listObserver.next(this.sharedList);
        },error => {console.log(error)});
    }

    private list(): Observable<Vehicle[]> {
        let options = new RequestOptions({ headers: commonHeaders() });

        return this.http.get(this.vehiclesUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(responseSerialized: Response): Observable<Vehicle[]> {
        let response = responseSerialized.json();
        return response || {};
    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        return Observable.throw("An error occurred.");
    }

    put(vehicle: Vehicle) {
        let options = new RequestOptions({ headers: commonHeaders() });

        let url = this.vehiclesUrl + vehicle.id;

        console.log("url: " + url);

        let body = JSON.stringify(vehicle);

        console.log("body: " + body);
        
        return this.http
            .put(url, body, options)
            .map(()=> vehicle)
            .catch(this.handleError);
    }

    add(vehicle: Vehicle) {
         let options = new RequestOptions({ headers: commonHeaders() });
 
         let url = this.vehiclesUrl + vehicle.id;
 
         console.log("url: " + url);
 
         let body = JSON.stringify(vehicle);
 
         console.log("body: " + body);
         
         return this.http
             .post(url, body, options)
             .map(this.extractData)
             .catch(this.handleError);
     }
}