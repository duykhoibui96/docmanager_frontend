import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpConnectionService } from '../../utils/http-connection.service';
import { CONFIG } from '../../utils/config';
import { SearchUtility } from '../../utils/search-utility';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})


export class DocumentListComponent extends SearchUtility implements OnInit {

  recordLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/documents/fetch?searchText=` + term)
          .do(() => this.recordSearchFailed = false)
          .catch(() => {
            this.recordSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  recordSearchFailed = false;
  recordFormatter = result => `${result['data']['originalname']} - ${result['data']['size']} bytes`;
  currentRecord: any;

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

    }, "/documents");


  }

  ngOnInit() {


  }

  delete(item) {

    if (!confirm("Chắc chắn xóa tài liệu này?"))
      return;
    this.removeItem(item)
      .then(record => this.alert.sendMessage("success", "Xóa tài liệu thành công"))
      .catch(err => this.alert.sendMessage("danger", "Xóa tài liệu thất bại"));

  }


  // DINAMIC PROPERTIES-----------------------------------------------------------------------

  download(file) {

    let a = document.createElement('a');
    a.href = `${CONFIG.SERVER_HOST}/get_file/${file.data.filename}`;
    a.download = file.data.originalname;
    a.click();

  }

  open(file) {

    console.log(file);
    let a = document.createElement('a');
    a.href = `${CONFIG.SERVER_HOST}/view_file/${file.data.filename}`;
    a.target = '_blank';
    a.click();


  }

  //------------------------------------------------------------------------------------------

}
