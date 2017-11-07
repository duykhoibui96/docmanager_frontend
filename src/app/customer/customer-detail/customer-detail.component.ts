import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeCustomerService } from '../../helper/employee-customer.service';
import { AlertService } from '../../alert/alert.service';
import { Customer } from '../customer';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../helper/api.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ModelDetail } from '../../model/model-detail';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent extends ModelDetail implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {
    super(conn, alert, router);

    this.current.data.subscribe(item => {

      this.initRecord(item.customer);

    })

  }

  ngOnInit() {

    this.url = "/customers";
    this.recordName = "Khách hàng";
    this.mode = "detail";
    this.keyList = ["CustomerID"];

  }

  initRecord(record) {

    this.record = record;


  }

}
