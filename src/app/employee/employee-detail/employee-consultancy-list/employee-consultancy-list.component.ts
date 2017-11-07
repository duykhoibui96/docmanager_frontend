import { Component, OnInit } from '@angular/core';
import { ModelList } from '../../../model/model-list';
import { CustomHttpService } from '../../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { HttpConnectionService } from '../../../utils/http-connection.service';
import { SearchUtility } from '../../../utils/search-utility';

@Component({
  selector: 'app-employee-consultancy-list',
  templateUrl: './employee-consultancy-list.component.html',
  styleUrls: ['./employee-consultancy-list.component.css']
})
export class EmployeeConsultancyListComponent extends SearchUtility implements OnInit {

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }


  parseKey(key: any, value: any) {
    // throw new Error("Method not implemented.");
  }


  constructor(
    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected router: Router,
    protected currentState: ActivatedRoute) {

    super(router, currentState, conn, {}, null);

    // this.currentState.parent.params.subscribe(data => this.emplID = data.id);

  }

  documentAccess(record) {

    let url = this.router.url.includes("admin") ?
      "/admin/document/document-manager/consultancy" :
      "../document-manager/consultancy";

    this.router.navigate([url, record._id], { relativeTo: this.currentState });

  }

}
