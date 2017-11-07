import { Component, OnInit } from '@angular/core';
import { ModelList } from '../../../model/model-list';
import { CustomHttpService } from '../../../custom-http.service';
import { AlertService } from '../../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../../utils/http-connection.service';
import { CONFIG } from '../../../utils/config';
import { SearchUtility } from '../../../utils/search-utility';

@Component({
  selector: 'app-document-manager-list',
  templateUrl: './document-manager-list.component.html',
  styleUrls: ['./document-manager-list.component.css']
})
export class DocumentManagerListComponent extends SearchUtility implements OnInit {

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

    super(router, currentState, conn, {}, "/documents");

    currentState.data.subscribe(data => {

      this.list = data.list.list;
      this.totalSize = data.list.totalSize;

    });


  }



}
