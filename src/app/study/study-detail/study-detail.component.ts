import { Component, OnInit } from '@angular/core';
import { ModelDetail } from '../../model/model-detail';
import { AlertService } from '../../alert/alert.service';
import { CustomHttpService } from '../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-study-detail',
  templateUrl: './study-detail.component.html',
  styleUrls: ['./study-detail.component.css']
})
export class StudyDetailComponent implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {


    if (this.router.url.includes('admin/info') || this.router.url.includes('user/info'))
      this.isCurrent = true;
    this.current.data.subscribe(data => {

      this.study = data.study;
      this.record = {};
      Object.keys(this.study).forEach(key => {

        if (key != "StudyID")
          this.record[key] = this.study[key];

      })
      if (this.record['Time']) {
        let time = new Date(this.record['Time']);
        this.record['Time'] = {

          day: time.getDate(),
          month: time.getMonth() + 1,
          year: time.getFullYear()

        }
      }

    })

  }

  ngOnInit() {

  }



  isCurrent = false;
  study: Object;
  record: Object;


  update() {

    let obj = Object.assign({}, this.record);
    obj['Time'] = new Date(`${obj['Time']['month']} ${obj['Time']['day']} ${obj['Time']['year']}`);
    this.conn.put("/studies", obj, this.study["_id"])
      .subscribe(data => {

        if (data)
          this.alert.sendMessage("success", "Cập nhật thông tin thành công");
        else
          this.alert.sendMessage("danger", "Nghiên cứu không tồn tại");

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật thông tin thất bại");

      })


  }

  seminarLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do(() => this.seminarSearchFailed = false)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/studies/fetch?searchText=` + term)
          .do(() => this.seminarSearchFailed = false)
          .catch(() => {
            this.seminarSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  seminarSearchFailed = false;
  seminarFormatter = result => !result ? null : `${result['Name']}`;
  documentLink: string;

}
