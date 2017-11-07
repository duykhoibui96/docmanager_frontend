import { Component, OnInit } from '@angular/core';
import { ModelList } from '../../../model/model-list';
import { CustomHttpService } from '../../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { Observable } from 'rxjs';
import { SearchUtility } from '../../../utils/search-utility';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-employee-study-list',
  templateUrl: './employee-study-list.component.html',
  styleUrls: ['./employee-study-list.component.css']
})
export class EmployeeStudyListComponent extends SearchUtility implements OnInit {

  parseKey(key: any, value: any) {
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  constructor(
    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected router: Router,
    protected currentState: ActivatedRoute) {

    super(router, currentState, conn, {}, null);

    this.currentState.parent.params.subscribe(data => this.emplID = data.id);

  }

  emplID: string;

  add() {

    console.log(this.currentRecord["_id"]);
    this.conn.post("/employee-study/study-employee/combine", {

      emplID: this.emplID,
      studyID: this.currentRecord["_id"]

    })
      .subscribe(data => {

        this.alert.sendMessage("success", "Thêm mục nghiên cứu thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()


          },
          relativeTo: this.currentState

        })

      }, err => {

        this.alert.sendMessage("danger", "Thêm mục nghiên cứu thất bại");
        // this.route.navigate(["."], {

        //   queryParams: {

        //     page: this.page,
        //     v: Date.now()


        //   },
        //   relativeTo: this.currentState

        // })


      })


  }

  delete(item) {

    if (!confirm("Muốn xóa mục nghiên cứu khỏi danh sách nghiên cứu?"))
      return;

    this.conn.post("/employee-study/study-employee/divide", {

      emplID: this.emplID,
      studyID: item["_id"]

    })
      .subscribe(data => {

        this.alert.sendMessage("success", "Xóa mục nghiên cứu ra khỏi danh sách nghiên cứu thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()


          },
          relativeTo: this.currentState

        })

      }, err => {

        this.alert.sendMessage("danger", "Thêm mục nghiên cứu thất bại");
        // this.route.navigate(["."], {

        //   queryParams: {

        //     page: this.page,
        //     v: Date.now()


        //   },
        //   relativeTo: this.currentState

        // })


      })



  }

  recordLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get('/studies/fetch?searchText=' + term)
          .do(() => this.recordSearchFailed = false)
          .catch(() => {
            this.recordSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  recordSearchFailed = false;
  recordFormatter = result => `${result['Name']}`;
  currentRecord: any;
  placeholder = "Nhập mã hoặc tên nghiên cứu";

  documentAccess(record) {

    let url = this.router.url.includes("admin") ?
    "/admin/document/document-manager/study" :
    "../document-manager/study";

  this.router.navigate([url, record._id], { relativeTo: this.currentState });

  }


}
