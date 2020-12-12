import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user.model';
import { JwtResponse } from './JwtResponse.model';

@Injectable()
export class SessionService {
    //private sessionUrl = "https://nameniap.com/spaine/MPGTracker/services/session/";
    private sessionUrl = "/mpgtracker/api/authenticate";

    constructor(private http: Http) { }

    private extractData(responseSerialized: Response): Observable<User> {
        let response = responseSerialized.json();
        return response || {};
    }

    private handleError(error: any): Observable<any> {
        console.error(error);
        return Observable.throw("An error occurred.");
    }

    login(user: User): Observable<JwtResponse> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify(user);
        
        return this.http
            .post(this.sessionUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
