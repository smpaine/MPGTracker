import { Injectable } from '@angular/core';
import { HttpModule, Http, JsonpModule, Jsonp, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Mileage } from "./mileage.model";
import { Vehicle } from "./vehicle.model";

@Injectable()
export class MileageService {
    private mileageUrl = "http://nameniap.com/spaine/MPGTracker/retrieveMileageData.php?callback=JSONP_CALLBACK";

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    list(vid: number): Observable<Mileage[]> {
        return this.jsonp.get(this.mileageUrl + "&vid=" + vid)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(responseSerialized: Response): Observable<Mileage[]> {
        let response = responseSerialized.json();
        return response || {};
    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        return Observable.throw("An error occurred.");
    }

    put(mileage: Mileage) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let url = this.mileageUrl + "&vid=" + mileage.vid;

        let body = JSON.stringify(mileage);

        return this.http
            .put(url, body, options)
            .map(()=> mileage)
            .catch(this.handleError);
    }

    delete(mileage: Mileage): Observable<Vehicle> {
        let url = this.mileageUrl + "&id=" + mileage.id;

        return this.http
            .delete(url)
            .catch(this.handleError);
    }

    find(id: number): Observable<Vehicle> {
        return this.http.get(this.mileageUrl + "&id=" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
}