import { Component, OnInit } from '@angular/core';
import { ModelList } from '../../../model/model-list';
import { CustomHttpService } from '../../../custom-http.service';
import { AlertService } from '../../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchUtility } from '../../../utils/search-utility';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-customer-consultancy-list',
  templateUrl: './customer-consultancy-list.component.html',
  styleUrls: ['./customer-consultancy-list.component.css']
})
export class CustomerConsultancyListComponent extends SearchUtility implements OnInit {

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

    this.router.navigate(["/admin/document/document-manager/consultancy", record._id]);

  }


}
