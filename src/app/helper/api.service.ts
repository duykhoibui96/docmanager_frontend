import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';
import { Model } from '../model/model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: CustomHttpService) { }

  add(object: Model): Observable<any> {

    let obj = object.getObject(true);

    return this.http.post(object.URL, obj);

  }

  update(object: Model): Observable<any> {

    let obj = object.getObject(false);

    return this.http.put(object.URL + object[object.ID], obj);

  }

  delete(object: Model): Observable<any> {

    return this.http.delete(object.URL + object[object.ID]);

  }

}
