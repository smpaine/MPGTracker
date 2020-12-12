import { Injectable, OnInit } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Vehicle } from "./vehicle.model";

import { commonHeaders } from "../common/headers";

@Injectable()
export class VehicleService {
    // private vehiclesUrl: string = "https://nameniap.com/spaine/MPGTracker/services/vehicles/";
    private vehiclesUrl: string = "/mpgtracker/api/vehicles/";

    constructor(private http: Http) {
    }

    list(): Observable<Vehicle[]> {
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
        console.error(error);
        return Observable.throw("An error occurred.");
    }

    update(vehicle: Vehicle) {
        let options = new RequestOptions({ headers: commonHeaders() });

        let url = this.vehiclesUrl;

        let body = JSON.stringify(vehicle);
        
        return this.http
            .post(url, body, options)
            .map(()=> vehicle)
            .catch(this.handleError);
    }

    add(vehicle: Vehicle) {
         let options = new RequestOptions({ headers: commonHeaders() });
 
         let url = this.vehiclesUrl;
 
         let body = JSON.stringify(vehicle);
         
         return this.http
             .put(url, body, options)
             .map(this.extractData)
             .catch(this.handleError);
     }
}