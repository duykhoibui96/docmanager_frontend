import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../../custom-http.service';
import { AlertService } from '../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../utils/http-connection.service';
import { CONFIG } from '../../utils/config';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  url = `${CONFIG.SERVER_HOST}/api/documents/uploading`;
  constructor(
    private conn: HttpConnectionService,
    private alertService: AlertService,
    private router: Router,
    private currentState: ActivatedRoute
  ) {

    // this.currentState.queryParams.subscribe(

    //   param => {

    //     if (param.collection) {

    //       this.collection = param.collection;
    //       if (param.collectionID) {
    //         let url = this.collection == 'consultancy' ?
    //           `/consultancies/by-id/${param.collectionID}` :
    //           `/studies/by-id/${param.collectionID}`;
    //         this.http.get(url)
    //           .subscribe(data => this.collectionRecord = data)

    //       }


    //     }

    //   }


    // )
    this.uploader = new FileUploader({ url: this.url });
    this.uploader.onAfterAddingFile = (file) => {

      console.log(file);
      file.withCredentials = false;

    };

    this.uploader.onBeforeUploadItem = (file) => {

      $(".app-btn").prop('disabled', true)

    };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.

    this.uploader.onCompleteAll = () => {
      $(".app-btn").prop('disabled', false);
      this.router.navigate(['/admin/document/list'],{ queryParams: { page: 1 }});
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.uploader.removeFromQueue(item);
      this.alertService.sendMessage("success", `Upload tài liệu ${item.file.name} thành công`);
    };

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      if (item.file)
        this.alertService.sendMessage("danger", `Upload tài liệu ${item.file.name}  thất bại`);
    };

  }

  ngOnInit() {
  }

  uploader: FileUploader;
  // collection = 'consultancy';
  // collectionRecord: Object;

  // recordLoading = (text$: Observable<string>) =>
  //   text$
  //     .debounceTime(200)
  //     .distinctUntilChanged()
  //     // .do(() => this.consultancySearchFailed = true)
  //     .switchMap(term => term == '' ? Observable.of([]) :
  //       this.http.get(`/${this.collection == 'consultancy' ? 'consultancies' : 'studies' }/fetch?searchText=` + term)
  //         .do(() => this.recordSearchFailed = false)
  //         .catch(() => {
  //           this.recordSearchFailed = true;
  //           return Observable.of([]);
  //         }))
  // //.do(() => this.searching = false)

  // recordSearchFailed = false;
  // recordFormatter = (result) => `${this.collection == 'consultancy' ? result.ConsID : result.StudyID } - ${result.Name}`

  uploadFiles() {

    // if (!this.collectionRecord || !this.collectionRecord['_id'])
    //   return;
    // console.log(this.collectionRecord);
    // this.uploader.setOptions({

    //   url: this.url + `?collection=${this.collection}&collectionID=${this.collectionRecord['_id']}`

    // })

    this.uploader.uploadAll();

  }

}
