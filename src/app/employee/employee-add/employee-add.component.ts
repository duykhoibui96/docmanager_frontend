import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ModelDetail } from '../../model/model-detail';
import { Router } from '@angular/router';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent extends ModelDetail implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected router: Router

  ) {
    super(conn, alert, router);

    this.initRecord();

  }

  ngOnInit() {

    this.url = "/employees";
    this.recordName = "Nhân viên";
    this.recordKey = "/employee";
    this.mode = "create";
    this.keyList = new Array()["EmplID"];
  }


  initRecord() {

    this.record = {

      EmplID: Date.now(),
      EmplRcd: 0,
      ChildDepartment: null,
      OfficerCode: null,
      JobTitle: null,
      Mail: null

    }


  }

  isEmailChecked = false;
  isEmailValid = false;

  validateEmail() {

    this.conn.post(this.url + '/email-check', {

      Mail: this.record['Mail']

    })
      .subscribe(data => {

        this.isEmailValid = true;
        this.isEmailChecked = true;

      }, err => {

        this.isEmailValid = false;
        this.isEmailChecked = true;

      })


  }

  emailChange(mail) {

    this.isEmailChecked = false;
    this.isEmailValid = false;

  }

}
