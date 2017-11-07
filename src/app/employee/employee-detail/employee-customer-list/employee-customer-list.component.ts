import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelList } from '../../../model/model-list';
import { AlertService } from '../../../alert/alert.service';
import { HttpConnectionService } from '../../../utils/http-connection.service';
import { SearchUtility } from '../../../utils/search-utility';

@Component({
  selector: 'app-employee-customer-list',
  templateUrl: './employee-customer-list.component.html',
  styleUrls: ['./employee-customer-list.component.css']
})
export class EmployeeCustomerListComponent extends SearchUtility implements OnInit {

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



  recordLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get('/customers/fetch?searchText=' + term)
          .do(() => this.recordSearchFailed = false)
          .catch(() => {
            this.recordSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  recordSearchFailed = false;
  recordFormatter = result => `${result['Name']}`;
  currentRecord: any;
  emplID: string;

  add() {

    console.log(this.currentRecord["_id"]);
    this.conn.post("/employee-customer/combine", {

      emplID: this.emplID,
      customerID: this.currentRecord["_id"]

    })
      .subscribe(data => {

        this.alert.sendMessage("success", "Thêm khách hàng quản lý thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()


          },
          relativeTo: this.currentState

        })

      }, err => {

        this.alert.sendMessage("danger", "Thêm khách hàng quản lý thất bại");
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

    if (!confirm("Muốn xóa khách hàng khỏi danh sách quản lý?"))
      return;

    this.conn.post("/employee-customer/divide", {

      emplID: this.emplID,
      customerID: item["_id"]

    })
      .subscribe(data => {

        this.alert.sendMessage("success", "Xóa khách hàng quản lý thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()


          },
          relativeTo: this.currentState

        })

      }, err => {

        this.alert.sendMessage("danger", "Thêm khách hàng quản lý thất bại");
        // this.route.navigate(["."], {

        //   queryParams: {

        //     page: this.page,
        //     v: Date.now()


        //   },
        //   relativeTo: this.currentState

        // })


      })



  }

}
