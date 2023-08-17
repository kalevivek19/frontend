import { Injectable, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MachineService {
    private machineUrl: string = environment.apiUrl;
    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Ocp-Apim-Subscription-Key', 'dcac49f63541410aaea442c10ed5c7ae')
        .set('Access-Control-Allow-Origin', 'https://dsapimgmt.azure-api.net');
    //Todo: Set headers in Interceptor
    constructor(
        private http: HttpClient,
        private _zone: NgZone
    ) { }

    getMachines() {
        return this.http.get(this.machineUrl);
    }

    getMachineDataService(name:any) {
        return this.http.get('https://dsapimgmt.azure-api.net/machines/v1/get-machine-data?name=' + name, { headers: this.headers });
    }
}