import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Vehicle } from "@/models";

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
    private vehiclesUrl: string = environment.API_URL + "/vehicles/";

    constructor(private http: HttpClient) {
    }

    list(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.vehiclesUrl);
    }

    update(vehicle: Vehicle) {
        let url = this.vehiclesUrl;
        
        return this.http.post(url, vehicle);
    }

    add(vehicle: Vehicle) {
         let url = this.vehiclesUrl;
         
         return this.http.put(url, vehicle);
     }
}