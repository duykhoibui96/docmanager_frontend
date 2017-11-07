import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../utils/http-connection.service';
import { SearchUtility } from '../../utils/search-utility';
import { CONFIG } from '../../utils/config';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.css']
})
export class DocumentManagerComponent extends SearchUtility implements OnInit {

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

    currentState.params.subscribe(data => {

      this.collection = data.collection;
      this.id = data.id;
      console.log(this.collection);
      let infoUrl = `/${this.collection == "consultancy" ? "consultancies" : "studies"}/${this.id}`;
      this.conn.get(infoUrl).subscribe(data => this.name = data.Name);

    })


  }

  recordLoading = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      // .do(() => this.documentSearchFailed = true)
      .switchMap(term => term == '' ? Observable.of([]) :
        this.conn.get(`/documents/fetch?searchText=` + term)
          .do(() => this.recordSearchFailed = false)
          .catch(() => {
            this.recordSearchFailed = true;
            return Observable.of([]);
          }))
  //.do(() => this.searching = false)

  recordSearchFailed = false;
  recordFormatter = result => `${result['data']['originalname']} - ${result['data']['size']} bytes`;
  currentRecord: any;
  collection: string;
  id: string;
  name: string;

  addFile() {

    this.conn.put(`/documents/by-${this.collection}`, {

      type: 'add',
      documentID: this.currentRecord["_id"]

    }, this.id)
      .subscribe(data => {

        this.alert.sendMessage("success", "Thêm tài liệu thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()

          },
          relativeTo: this.currentRoute

        });

      })

  }

  download(file) {

    let a = document.createElement('a');
    a.href = `${CONFIG.SERVER_HOST}/get_file/${file.data.filename}`;
    a.download = file.data.originalname;
    a.click();

  }

  open(file) {

    console.log(file);
    let a = document.createElement('a');
    a.href = `${CONFIG.SERVER_HOST}/view_file/${file.data.filename}`;
    a.target = '_blank';
    a.click();


  }

  delete(file) {

    if (!confirm("Muốn xóa tài liệu này ra khỏi danh sách?"))
      return;

    this.conn.put(`/documents/by-${this.collection}`, {

      type: 'remove',
      documentID: file["_id"]

    }, this.id)
      .subscribe(data => {

        this.alert.sendMessage("success", "Xóa tài liệu thành công");
        this.route.navigate(["."], {

          queryParams: {

            page: this.page,
            v: Date.now()

          },
          relativeTo: this.currentRoute

        });

      })


  }

}
