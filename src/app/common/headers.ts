import { Headers } from '@angular/http';

export function commonHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem("token") != undefined) {
        headers.append("Token", localStorage.getItem("token"));
    }

    return headers; 
}
