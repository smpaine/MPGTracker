import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Mileage } from "./mileage.model";
import { Vehicle } from "./vehicle.model";

import { commonHeaders } from "../common/headers";

@Injectable()
export class MileageService {
    private mileageUrl = "/mpgtracker/api/mileages/vehicle/";
    // Local services testing
    //private mileageUrl = "/api/mileages/vehicle/";

    constructor(private http: Http) { }

    list(vid: number): Observable<Mileage[]> {
        let options = new RequestOptions({ headers: commonHeaders() });

        return this.http.get(this.mileageUrl + vid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(responseSerialized: Response): Observable<Mileage[]> {
        let response = responseSerialized.json();
        return response || {};
    }

    private handleError(error: any): Observable<any> {
        console.error(error);
        return Observable.throw("An error occurred.");
    }

    put(mileage: Mileage) {
        let options = new RequestOptions({ headers: commonHeaders() });

        let url = this.mileageUrl + mileage.vid;

        let body = JSON.stringify(mileage);

        return this.http
            .put(url, body, options)
            .map(()=> mileage)
            .catch(this.handleError);
    }
}