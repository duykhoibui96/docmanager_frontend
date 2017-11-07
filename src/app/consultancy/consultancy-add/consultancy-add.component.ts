import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelDetail } from '../../model/model-detail';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-consultancy-add',
  templateUrl: './consultancy-add.component.html',
  styleUrls: ['./consultancy-add.component.css']
})
export class ConsultancyAddComponent extends ModelDetail implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {

    super(conn, alert, router);
    this.initRecord();


  }

  ngOnInit() {

    this.url = "/consultancies";
    this.recordName = "Mục tư vấn";
    this.recordKey = "/consultancy";
    this.mode = "create";
    this.keyList = new Array()["ConsID"];

  }

  employeeLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do(() => this.employeeSearchFailed = false)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/employees/fetch?searchText=` + term)
          .do(() => this.employeeSearchFailed = false)
          .catch(() => {
            this.employeeSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  employeeSearchFailed = false;
  employeeFormatter = result => !result ? null : `${result['Name']}`

  customerLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do(() => this.customerSearchFailed = false)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/customers/fetch?searchText=` + term)
          .do(() => this.customerSearchFailed = false)
          .catch(() => {
            this.customerSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  customerSearchFailed = false;
  customerFormatter = result => !result ? null : `${result['Name']}`;

  initRecord() {

    let time = new Date();
    this.record = {

      ConsID: Date.now(),
      Name: null,
      Content: null,
      ConsultedPerson: null,
      ConsultingEmpl: null,
      Customer: null,
      Time: {

        day: time.getDate(),
        month: time.getMonth() + 1,
        year: time.getFullYear()

      }

    };


  }
}
