import { Component, OnInit } from '@angular/core';
import { ModelDetail } from '../../../model/model-detail';
import { CustomHttpService } from '../../../custom-http.service';
import { AlertService } from '../../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {

    if (this.router.url.includes('admin/info') || this.router.url.includes('user/info'))
      this.isCurrent = true;
    this.current.data.subscribe(data => {

      console.log(data);
      this.employee = data.employee;
      this.record = {};
      Object.keys(this.employee).forEach(key => {

        if (key != "EmplID" && key != "Mail")
          this.record[key] = this.employee[key];

      })

    })

  }

  ngOnInit() {

  }



  isCurrent = false;
  isEmailChecked = false;
  isEmailValid = false;
  password: string;
  confirmedPassword: string;
  passwordConflict = false;
  employee: Object;
  record: Object;
  passwordChangeFinished = false;

  updatePassword() {

    if (this.password != this.confirmedPassword) {
      this.passwordConflict = true;
      return;
    }
    else
      this.passwordConflict = false;

    this.conn.put("/accounts", {

      Password: this.password

    }, this.employee["EmplID"])
      .subscribe(data => {

        this.alert.sendMessage("success", "Cập nhật mật khẩu thành công");
        this.password = this.confirmedPassword = null;
        this.passwordChangeFinished = true;

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật mật khẩu thất bại");

      })


  }


  update() {

    this.conn.put("/employees", this.record, this.employee["_id"])
      .subscribe(data => {

        if (data)
          this.alert.sendMessage("success", "Cập nhật thông tin thành công");
        else
          this.alert.sendMessage("danger", "Nhân viên không tồn tại");

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật thông tin thất bại");

      })


  }


}
