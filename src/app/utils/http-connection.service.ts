import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from './config';
import { AuthService } from './auth.service';

declare var jquery: any;
declare var $: any;

@Injectable()
export class HttpConnectionService {

  private apiUrl = CONFIG.FULL_API_URL;
  constructor(private http: Http, private auth: AuthService) { }

  private handleResult(request: Observable<any>): Observable<any> {

    return request
      .map(goodResponse => {

        try {

          return goodResponse.json();

        } catch (error) {

          return goodResponse._body;

        }

      }, badResponse => {

        console.log(badResponse);
        if (badResponse.status == 0) {

          //Server connection error

        } else if (badResponse.status == 500) {

          //Internal server error
          console.log(badResponse._body);

        }

        try {

          return {

            status: badResponse.status,
            message: badResponse.json()

          };

        } catch (error) {

          return {

            status: badResponse.status,
            message: badResponse._body

          };

        }


      })



  }

  private buildUrl = (url, parameter) => `${this.apiUrl}${url}${parameter ? `/${parameter}` : ''}`

  private buildRequestOptions(method, searchParameters, body = null): RequestOptions {

    let headers = new Headers();
    if (this.auth.TOKEN)
      headers.append("token", this.auth.TOKEN);

    let optionsArg = new RequestOptions();

    optionsArg.headers = headers;
    optionsArg.method = method;

    if (searchParameters) {

      let searchParams = new URLSearchParams();
      Object.keys(searchParameters).forEach(key => {

        searchParams.append(key, searchParameters[key]);

      })
      optionsArg.search = searchParams;

    }

    if (body) {

      optionsArg.body = body;

    }


    return new RequestOptions(optionsArg);
  }

  get(url, parameter = null, searchParameters = null): Observable<any> {

    return this.handleResult(
      this.http.request(
        this.buildUrl(url, parameter),
        this.buildRequestOptions("get", searchParameters)));

  }

  post(url, data, parameter = null, searchParameters = null): Observable<any> {

    console.log(searchParameters);
    return this.handleResult(
      this.http.request(
        this.buildUrl(url, parameter),
        this.buildRequestOptions("post", searchParameters, data)));

  }

  put(url, data, parameter, searchParameters = null): Observable<any> {

    return this.handleResult(
      this.http.request(
        this.buildUrl(url, parameter),
        this.buildRequestOptions("put", searchParameters, data)));

  }

  delete(url, parameter, searchParameters = null): Observable<any> {

    return this.handleResult(
      this.http.request(
        this.buildUrl(url, parameter),
        this.buildRequestOptions("delete", searchParameters)));

  }

}
