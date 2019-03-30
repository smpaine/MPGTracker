import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Mileage } from "./mileage.model";
import { Vehicle } from "./vehicle.model";

@Injectable()
export class MileageService {
    private mileageUrl = "https://nameniap.com/spaine/MPGTracker/services/mileagedata/";

    constructor(private http: Http) {

    }

    list(vid: number): Observable<Mileage[]> {
        let headers = new Headers();
        if (localStorage.getItem("sessionId") != undefined) {
            headers.append("SessionId", ""+localStorage.getItem("sessionId"));
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.mileageUrl + vid, options)
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
        if (localStorage.getItem("sessionId") != undefined) {
            headers.append("SessionId", ""+localStorage.getItem("sessionId"));
        }

        let options = new RequestOptions({ headers: headers });

        let url = this.mileageUrl + mileage.vid;

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