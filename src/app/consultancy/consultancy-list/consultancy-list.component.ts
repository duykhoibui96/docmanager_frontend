import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultancy } from '../consultancy';
import { AlertService } from '../../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../helper/api.service';

import 'rxjs/add/observable/of';
import { ModelList } from '../../model/model-list';
import { SearchUtility } from '../../utils/search-utility';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.css']
})
export class ConsultancyListComponent extends SearchUtility implements OnInit {

  parseKey(key: any, value: any) {
    if (!value)
      return;

    if (key != "startDate" && key != "endDate")
      this.searchParams[key] = value;
    else {

      let time = new Date(Number(value));
      this.searchParams[key] = {

        day: time.getDate(),
        month: time.getMonth() + 1,
        year: time.getFullYear()

      }

    }

  }

  getFullQueryParams(): Object {

    let object = super.getFullQueryParams();

    if (this.searchParams["keyWord"] || this.searchParams["timeMode"] != "all") {

      if (this.searchParams["keyWord"])
        object["keyWord"] = this.searchParams["keyWord"];
      object["timeMode"] = this.searchParams["timeMode"];
      if (this.searchParams["startDate"]) {

        let time = new Date(`${this.searchParams["startDate"]["month"]} ${this.searchParams["startDate"]["day"]} ${this.searchParams["startDate"]["year"]}`)
        object["startDate"] = time.getTime();

      }
      if (this.searchParams["endDate"]) {

        let time = new Date(`${this.searchParams["endDate"]["month"]} ${this.searchParams["endDate"]["day"]} ${this.searchParams["endDate"]["year"]}`)
        object["endDate"] = time.getTime();

      }

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
      startDate: null,
      endDate: null,
      timeMode: "all"

    }, "/consultancies");


  }

  ngOnInit() {


  }

  delete(item) {

    if (!confirm("Chắc chắn xóa mục tư vấn này?"))
      return;
    this.removeItem(item)
      .then(record => {

        if (record)
          this.alert.sendMessage("success", "Xóa tư vấn thành công");
        else
          this.alert.sendMessage("danger", "Tư vấn không tồn tại");

      })
      .catch(err => this.alert.sendMessage("danger", "Xóa mục tư vấn thất bại"));

  }


  // DINAMIC PROPERTIES-----------------------------------------------------------------------


  //------------------------------------------------------------------------------------------
}
