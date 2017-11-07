import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelList } from '../../../model/model-list';
import { AlertService } from '../../../alert/alert.service';
import { SearchUtility } from '../../../utils/search-utility';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-customer-employee-list',
  templateUrl: './customer-employee-list.component.html',
  styleUrls: ['./customer-employee-list.component.css']
})
export class CustomerEmployeeListComponent extends SearchUtility implements OnInit {

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

}
