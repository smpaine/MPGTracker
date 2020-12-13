import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Mileage, Vehicle } from "@/models";

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class MileageService {
    private mileageUrl = environment.API_URL + "/mileages/vehicle/";

    constructor(private http: HttpClient) { }

    list(vid: number): Observable<Mileage[]> {

        return this.http.get<Mileage[]>(this.mileageUrl + vid);
    }

    put(mileage: Mileage) {
        let url = this.mileageUrl + mileage.vid;

        return this.http.put(url, mileage);
    }
}