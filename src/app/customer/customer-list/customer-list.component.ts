import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { AlertService } from '../../alert/alert.service';
import { ApiService } from '../../helper/api.service';
import { ModelList } from '../../model/model-list';
import { CustomHttpService } from '../../custom-http.service';
import { Observable } from 'rxjs';
import { SearchUtility } from '../../utils/search-utility';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent extends SearchUtility implements OnInit {

  parseKey(key: any, value: any) {
    if (!value)
      return;

    this.searchParams[key] = value;

  }

  getFullQueryParams(): Object {

    let object = super.getFullQueryParams();

    if (this.searchParams["keyWord"] || this.searchParams["mode"] != "all") {

      if (this.searchParams["keyWord"])
        object["keyWord"] = this.searchParams["keyWord"];
      object["mode"] = this.searchParams["mode"];

    }

    return object;

  }

  constructor(
    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected router: Router,
    protected currentState: ActivatedRoute) {

    super(router, currentState, conn, {

      keyWord: null,
      mode: "all"

    }, "/customers");


  }

  ngOnInit() {


  }

  delete(item) {

    if (!confirm("Chắc chắn xóa khách hàng này?"))
      return;
    this.removeItem(item)
      .then(record => {

        if (record)
          this.alert.sendMessage("success", "Xóa khách hàng thành công");
        else
          this.alert.sendMessage("danger", "Khách hàng không tồn tại");

      })
      .catch(err => this.alert.sendMessage("danger", "Xóa khách hàng thất bại"));

  }


  // DINAMIC PROPERTIES-----------------------------------------------------------------------


  //------------------------------------------------------------------------------------------
}
