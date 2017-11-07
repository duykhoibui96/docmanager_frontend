import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../helper/api.service';
import { AlertService } from '../../alert/alert.service';
import { Consultancy } from '../consultancy';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../../custom-http.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelDetail } from '../../model/model-detail';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-consultancy-detail',
  templateUrl: './consultancy-detail.component.html',
  styleUrls: ['./consultancy-detail.component.css']
})
export class ConsultancyDetailComponent implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {


    if (this.router.url.includes('admin/info') || this.router.url.includes('user/info'))
      this.isCurrent = true;
    this.current.data.subscribe(data => {

      this.consultancy = data.consultancy;
      this.record = {};
      Object.keys(this.consultancy).forEach(key => {

        if (key != "ConsID")
          this.record[key] = this.consultancy[key];

      })
      if (this.record['Time']) {
        let time = new Date(this.record['Time']);
        this.record['Time'] = {

          day: time.getDate(),
          month: time.getMonth() + 1,
          year: time.getFullYear()

        }
      }

    })

  }

  ngOnInit() {

  }



  isCurrent = false;
  consultancy: Object;
  record: Object;


  update() {

    let obj = Object.assign({}, this.record);
    obj['Time'] = new Date(`${obj['Time']['month']} ${obj['Time']['day']} ${obj['Time']['year']}`);
    this.conn.put("/consultancies", obj, this.consultancy["_id"])
      .subscribe(data => {

        if (data)
          this.alert.sendMessage("success", "Cập nhật tư vấn thành công");
        else
          this.alert.sendMessage("danger", "Tư vấn không tồn tại");

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật thông tin thất bại");

      })


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


}
