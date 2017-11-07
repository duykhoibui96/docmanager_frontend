import { Component, OnInit, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from '../employee';
import { AlertService } from '../../alert/alert.service';
import { ApiService } from '../../helper/api.service';
import { Observable } from 'rxjs';
import { ModelList } from '../../model/model-list';
import { SearchUtility } from '../../utils/search-utility';
import { HttpConnectionService } from '../../utils/http-connection.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends SearchUtility implements OnInit {


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

    }, "/employees");


  }

  ngOnInit() {


  }

  delete(item) {

    if (!confirm("Chắc chắn xóa nhân viên này?"))
      return;
    this.removeItem(item)
      .then(record => {

        if (record)
          this.alert.sendMessage("success", "Xóa nhân viên thành công");
        else
          this.alert.sendMessage("danger", "Nhân viên không tồn tại");

      })
      .catch(err => this.alert.sendMessage("danger", "Xóa nhân viên thất bại"));

  }


  // DINAMIC PROPERTIES-----------------------------------------------------------------------


  //------------------------------------------------------------------------------------------

}
