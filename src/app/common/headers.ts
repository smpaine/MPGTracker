import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
if (localStorage.getItem("token") != undefined) {
    contentHeaders.append("Token", localStorage.getItem("token"));
}
