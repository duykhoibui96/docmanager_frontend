import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessage(type: string, message: string) {
    this.subject.next({ type: type, message: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
