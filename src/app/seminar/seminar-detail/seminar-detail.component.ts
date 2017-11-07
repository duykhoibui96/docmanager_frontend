import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelDetail } from '../../model/model-detail';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-seminar-detail',
  templateUrl: './seminar-detail.component.html',
  styleUrls: ['./seminar-detail.component.css']
})
export class SeminarDetailComponent implements OnInit {

  constructor(

    protected conn: HttpConnectionService,
    protected alert: AlertService,
    protected current: ActivatedRoute,
    protected router: Router

  ) {


    if (this.router.url.includes('admin/info') || this.router.url.includes('user/info'))
      this.isCurrent = true;
    this.current.data.subscribe(data => {

      this.seminar = data.seminar;
      this.record = {};
      Object.keys(this.seminar).forEach(key => {

        if (key != "SeminarID")
          this.record[key] = this.seminar[key];

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
  seminar: Object;
  record: Object;


  update() {

    let obj = Object.assign({}, this.record);
    obj['Time'] = new Date(`${obj['Time']['month']} ${obj['Time']['day']} ${obj['Time']['year']}`);
    this.conn.put("/seminars", obj, this.seminar["_id"])
      .subscribe(data => {

        if (data)
          this.alert.sendMessage("success", "Cập nhật thông tin thành công");
        else
          this.alert.sendMessage("danger", "Hội thảo không tồn tại");

      }, err => {

        this.alert.sendMessage("danger", "Cập nhật thông tin thất bại");

      })


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

}
