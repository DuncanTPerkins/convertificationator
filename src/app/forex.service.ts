import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

declare var $: any;

@Injectable()
export class ForexService {

  constructor(private http: Http) {
  }

  getHeaders() : Headers {
    let headers: Headers = new Headers();
    headers.append('Cache-control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers;
  }

  getForexConversion(baseCurrency: string, targetCurrency: string) {
    let headers = this.getHeaders();
    return this.http.get(environment.restApiPrefix + `forex/${baseCurrency}/${targetCurrency}`, { headers: headers, withCredentials: true });
  }

}
