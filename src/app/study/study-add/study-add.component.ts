import { Component, OnInit } from '@angular/core';
import { ModelDetail } from '../../model/model-detail';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-study-add',
  templateUrl: './study-add.component.html',
  styleUrls: ['./study-add.component.css']
})
export class StudyAddComponent extends ModelDetail implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {

    super(conn, alert, router);
    this.initRecord();

  }

  ngOnInit() {

    this.url = "/studies";
    this.recordName = "Mục nghiên cứu";
    this.mode = "create";
    this.recordKey = "/study";
    this.keyList = new Array()["StudyID"];

  }

  seminarLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do(() => this.seminarSearchFailed = false)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/seminars/fetch?searchText=` + term)
          .do(() => this.seminarSearchFailed = false)
          .catch(() => {
            this.seminarSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  seminarSearchFailed = false;
  seminarFormatter = result => !result ? null : `${result['Name']}`;

  initRecord() {

    let time = new Date();
    this.record = {

      StudyID: Date.now(),
      Name: null,
      Content: null,
      Seminar: null,
      Time: {

        day: time.getDate(),
        month: time.getMonth() + 1,
        year: time.getFullYear()

      }

    };


  }

}
