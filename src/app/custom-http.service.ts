import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert/alert.service';


import { Observable } from 'rxjs/Rx';

declare var jquery: any;
declare var $: any;

@Injectable()
export class CustomHttpService {

  static SERVER_HOST = `http://${window.location.hostname}:3000`;

  constructor(private auth: AuthenticationService, private http: Http, private alertService: AlertService) { }

  url = `${CustomHttpService.SERVER_HOST}/api`;

  private initHeader(): Headers {

    let token = this.auth.getToken();

    if (token == null)
      return null;

    let headers = new Headers();
    headers.append('token', token);
    return headers;

  }

  get(path): Observable<any> {

    console.log(path);
    let tokenHeader = this.initHeader();

    if (!tokenHeader)
      return this.http.get(this.url + path)
        .do(this.preRequest)
        .map(this.handleSuccess)
        .catch(err => this.handleError(err,this.alertService));

    return this.http.get(this.url + path, {

      headers: tokenHeader

    })
      .do(this.preRequest)
      .map(this.handleSuccess)
      .catch(err => this.handleError(err,this.alertService));

  }

  post(path, obj): Observable<any> {

    let tokenHeader = this.initHeader();

    if (!tokenHeader)
      return this.http.post(this.url + path, obj)
        .do(this.preRequest)
        .map(this.handleSuccess)
        .catch(err => this.handleError(err,this.alertService));

    return this.http.post(this.url + path, obj, {

      headers: tokenHeader

    }).do(this.preRequest)
      .map(this.handleSuccess)
      .catch(err => this.handleError(err,this.alertService));


  }

  put(path, obj): Observable<any> {

    let tokenHeader = this.initHeader();

    if (!tokenHeader)
      return this.http.put(this.url + path, obj)
        .do(this.preRequest)
        .map(this.handleSuccess)
        .catch(err => this.handleError(err,this.alertService));

    return this.http.put(this.url + path, obj, {

      headers: tokenHeader

    })
      .do(this.preRequest)
      .map(this.handleSuccess)
      .catch(err => this.handleError(err,this.alertService));

  }

  delete(path): Observable<any> {

    let tokenHeader = this.initHeader();

    if (!tokenHeader)
      return this.http.delete(this.url + path)
        .do(this.preRequest)
        .map(this.handleSuccess)
        .catch(err => this.handleError(err,this.alertService));

    return this.http.delete(this.url + path, {

      headers: tokenHeader

    }).do(this.preRequest)
      .map(this.handleSuccess)
      .catch(err => this.handleError(err,this.alertService));

  }

  private preRequest() {

    return $(".app-btn").prop('disabled', true)

  }

  private handleSuccess(response): Observable<any> {

    console.log(response);
    $(".app-btn").prop('disabled', false);
    return response.json();

  }

  private handleError(err,alert): Observable<any> {

    console.log(err);
    if (err.status != 0)
      $(".app-btn").prop('disabled', false);

    let data = null;

    if (this)
      switch (err.status) {

        case 500:
          alert.sendMessage('danger', 'Không thể thực hiện tác vụ, vui lòng thử lại sau');
          break;

        case 0:
          alert.sendMessage('danger', 'Không thể kết nối đến server');
          break;

        default:
          try {

            data = err.json();

          } catch (error) {

            data = err._body;

          }

      }


    return Observable.throw({

      status: err.status,
      data: data

    })

  }

}
