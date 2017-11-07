import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelList } from '../../model/model-list';
import { SearchUtility } from '../../utils/search-utility';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-seminar-list',
  templateUrl: './seminar-list.component.html',
  styleUrls: ['./seminar-list.component.css']
})
export class SeminarListComponent extends SearchUtility implements OnInit {

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

      console.log("Searching");
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

    console.log(object);

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

    }, "/seminars");


  }

  ngOnInit() {


  }

  delete(item) {

    if (!confirm("Chắc chắn xóa hội thảo này?"))
      return;
    this.removeItem(item)
      .then(record => {

        if (record)
          this.alert.sendMessage("success", "Xóa hội thảo thành công");
        else
          this.alert.sendMessage("danger", "Hội thảo không tồn tại");

      })
      .catch(err => this.alert.sendMessage("danger", "Xóa hội thảo thất bại"));

  }


  // DINAMIC PROPERTIES-----------------------------------------------------------------------


  //------------------------------------------------------------------------------------------


}
