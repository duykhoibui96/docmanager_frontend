import { Routes, Resolve } from "@angular/router";

export class CONFIG {

    static SERVER_HOST = `http://${window.location.hostname}:3000`;
    static API_URL = "/api";
    static FULL_API_URL = `http://${window.location.hostname}:3000/api`;

}
