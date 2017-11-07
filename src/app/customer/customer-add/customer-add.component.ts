import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelDetail } from '../../model/model-detail';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent extends ModelDetail implements OnInit {

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

    this.url = "/customers";
    this.recordName = "Khách hàng";
    this.mode = "create";
    this.recordKey = "/customer";
    this.keyList = new Array()["CustomerID"];

  }

  initRecord(record = null) {

    this.record = {

      CustomerID: Date.now(),
      Name: null,
      Address: null,
      Representative: null,
      Phone: null

    };


  }


}
