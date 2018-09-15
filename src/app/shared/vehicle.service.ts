import { Injectable } from '@angular/core';
import { HttpModule, Http, JsonpModule, Jsonp, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Vehicle } from "./vehicle.model";

@Injectable()
export class VehicleService {
    private vehiclesUrl = "https://nameniap.com/spaine/MPGTracker/retrieveVehicles.php?callback=JSONP_CALLBACK";

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    list(): Observable<Vehicle[]> {
        return this.jsonp.get(this.vehiclesUrl)
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let url = this.vehiclesUrl + vehicle.id;

        let body = JSON.stringify(vehicle);

        return this.http
            .put(url, body, options)
            .map(()=> vehicle)
            .catch(this.handleError);
    }

    delete(vehicle: Vehicle): Observable<Vehicle> {
        let url = this.vehiclesUrl + vehicle.id;

        return this.http
            .delete(url)
            .catch(this.handleError);
    }

    find(id: number): Observable<Vehicle> {
        return this.http.get(this.vehiclesUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
}