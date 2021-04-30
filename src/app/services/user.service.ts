import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from "@/_models";

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private usersUrl: string = environment.API_URL + "/users/";

    constructor(private http: HttpClient) {
    }

    list(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    update(user: User) {
        let url = this.usersUrl;

        return this.http.post(url, user);
    }

    add(user: User) {
        let url = this.usersUrl;

        return this.http.put(url, user);
    }

    delete(user: User) {
        let url = this.usersUrl + '/' + user.id;

        return this.http.delete(url);
    }
}