import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { Observable } from 'rxjs';
import { HttpConnectionService } from '../../../utils/http-connection.service';

@Component({
  selector: 'app-document-add-existed-files',
  templateUrl: './document-add-existed-files.component.html',
  styleUrls: ['./document-add-existed-files.component.css']
})
export class DocumentAddExistedFilesComponent implements OnInit {

  constructor(
    private conn: HttpConnectionService,
    private currentState: ActivatedRoute,
    private router: Router,
    private alert: AlertService

  ) {

    this.currentState
      .parent
      .queryParams
      .subscribe(param => {

        this.list = new Array();
        if (param.collection) {

          this.routingUrl = '/admin/' + param.collection + '/detail/' + param.collectionID;
          this.collection = param.collection;
          if (param.id) {
            let url = this.collection == 'consultancy' ?
              `/consultancies/by-id/${param.id}` :
              `/studies/by-id/${param.id}`;

            this.routingUrl = '/admin/' +
              this.collection
              + '/detail/' + param.collectionID;

            this.apiUrl = `/documents/resource-add?collection=${param.collection}&collectionID=${param.id}`;
            this.conn.get(url)
              .subscribe(data => {

                console.log(data);

                this.collectionRecord = data

              }, err => {

                if (err.status == 404 && err.data.instance) {
                  this.alert.sendMessage("danger", `Mục ${this.collection == 'consultancy' ? 'tư vấn' : 'nghiên cứu'} không tồn tại`);
                  this.router.navigate([`/admin/${this.collection}/list`], { queryParams: { page: 1 } });
                }

              })

          }

        }

      })

  }

  ngOnInit() {
  }

  collection: string;
  collectionRecord: Object;
  routingUrl: string;
  apiUrl: string;

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
  list: Array<any>;

  addFile() {

    if (this.list.find(item => this.currentRecord._id == item._id)) {

      this.alert.sendMessage("warning", "Tài liệu đã nằm trong danh sách sẽ thêm");
      return;
    }

    this.list.push(this.currentRecord);
    this.currentRecord = null;

  }

  modifyDate(time) {

    return new Date(time).toLocaleDateString();

  }

  addDocuments() {

    this.conn.post(this.apiUrl, {

      documents: this.list

    })
      .subscribe(data => {
        
        this.list = new Array();
        this.alert.sendMessage("success","Cập nhật tài liệu thành công");
        this.router.navigate(['../list'], {

          queryParams: {

            page: 1,
            collection: this.collection,
            id: this.collectionRecord['_id'],
            collectionID: this.collection == 'consultancy' ? this.collectionRecord['ConsID'] : this.collectionRecord['StudyID']

          },

          relativeTo: this.currentState

        })
        
      }, err => {

        if (err.type == 404 && err.data.instance)
          switch (err.data.instance) {

            case 'document':
              this.alert.sendMessage("danger", "Tài liệu đã bị xóa trước đó");
              break;

            case 'consultancy':
              this.alert.sendMessage("danger", "Mục tư vấn không tồn tại");
              this.router.navigate([`/admin/consultancy/list`], { queryParams: { page: 1 } });
              break;

            case 'study':
              this.alert.sendMessage("danger", "Mục nghiên cứu không tồn tại");
              this.router.navigate([`/admin/study/list`], { queryParams: { page: 1 } });
              break;



          }

      })

  }

}
