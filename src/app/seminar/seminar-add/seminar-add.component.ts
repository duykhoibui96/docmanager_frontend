import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ModelDetail } from '../../model/model-detail';
import { Router } from '@angular/router';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-seminar-add',
  templateUrl: './seminar-add.component.html',
  styleUrls: ['./seminar-add.component.css']
})
export class SeminarAddComponent extends ModelDetail implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected router: Router

  ) {

    super(conn, alert, router);


    this.initRecord();



  }

  ngOnInit() {

    this.url = "/seminars";
    this.recordName = "Hội thảo";
    this.mode = "create";
    this.recordKey = "/seminar";
    this.keyList = new Array()["SeminarID"];

  }


  indexLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/employees/fetch?searchText=` + term)
          .do(() => this.indexSearchFailed = false)
          .catch(() => {
            this.indexSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  indexSearchFailed = false;
  indexFormatter = result => `${result['Name']}`;

  initRecord() {

    let time = new Date();
    this.record = {

      SeminarID: Date.now(),
      Name: null,
      Content: null,
      OrganizationalUnit: null,
      Time: {

        day: time.getDate(),
        month: time.getMonth() + 1,
        year: time.getFullYear()


      },
      SharingEmpl: null


    }


  }

}
