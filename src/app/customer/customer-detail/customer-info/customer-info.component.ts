import { Component, OnInit } from '@angular/core';
import { ModelDetail } from '../../../model/model-detail';
import { CustomHttpService } from '../../../custom-http.service';
import { AlertService } from '../../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {


    if (this.router.url.includes('admin/info') || this.router.url.includes('user/info'))
      this.isCurrent = true;
    this.current.parent.data.subscribe(data => {

      this.customer = data.customer;
      this.record = {};
      Object.keys(this.customer).forEach(key => {

        if (key != "CustomerID")
          this.record[key] = this.customer[key];

      })

    })

  }

  ngOnInit() {

  }



  isCurrent = false;
  customer: Object;
  record: Object;

  update() {

    this.conn.put("/customers", this.record, this.customer["_id"])
      .subscribe(data => {

        if (data)
          this.alert.sendMessage("success", "Cập nhật thông tin thành công");
        else
          this.alert.sendMessage("danger", "Khách hàng không tồn tại");

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật thông tin thất bại");

      })


  }

}
