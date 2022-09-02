import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Mileage, Vehicle } from "@/models";

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class MileageService {
    private mileageUrl = environment.API_URL + "/mileages/";

    constructor(private http: HttpClient) { }

    list(vid: Number): Observable<Mileage[]> {
        let url = this.mileageUrl + "vehicle/" + vid;

        return this.http.get<Mileage[]>(url);
    }

    put(mileage: Mileage) {
        let url = this.mileageUrl + "vehicle/" + mileage.vid;

        return this.http.put(url, mileage);
    }

    get(mid: Number): Observable<Mileage> {
        let url = this.mileageUrl + mid;
        return this.http.get<Mileage>(url);
    }
}