import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../custom-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpConnectionService } from '../../utils/http-connection.service';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {

  constructor(private conn: HttpConnectionService, private router: Router, private currentState: ActivatedRoute) { }

  ngOnInit() {
  }

  recordLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`${this.apiUrl}/fetch?searchText=` + term)
          .do(() => this.recordSearchFailed = false)
          .catch(() => {
            this.recordSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  recordSearchFailed = false;
  recordFormatter = result => `${result['Name']}`;
  currentRecord: any;

  @Input() apiUrl: string;
  @Input() placeholder: string;

  accessRecord() {

    console.log(this.currentRecord);
    this.router.navigate(["../detail", this.currentRecord["_id"]],{ relativeTo: this.currentState });

  }

}
