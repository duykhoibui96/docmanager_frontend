import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CustomHttpService } from '../../../custom-http.service';
import { AlertService } from '../../../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnectionService } from '../../../utils/http-connection.service';
import { CONFIG } from '../../../utils/config';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {

  url = `${CONFIG.SERVER_HOST}/api/documents`;
  constructor(
    private conn: HttpConnectionService,
    private alertService: AlertService,
    private router: Router,
    private currentState: ActivatedRoute
  ) {

    this.currentState.parent.queryParams.subscribe(

      param => {

        if (param.collection) {

          this.routingUrl = '/admin/' + param.collection + '/detail/' + param.collectionID;
          console.log(this.routingUrl);
          this.collection = param.collection;
          if (param.id) {
            let url = this.collection == 'consultancy' ?
              `/consultancies/by-id/${param.id}` :
              `/studies/by-id/${param.id}`;

            this.routingUrl = '/admin/' +
              this.collection
              + '/detail/' + param.collectionID;


            this.conn.get(url)
              .subscribe(data => {

                this.collectionRecord = data

              },err => {

                if (err.status == 404 && err.data.instance)
                {
                  this.alertService.sendMessage("danger",`Mục ${this.collection == 'consultancy' ? 'tư vấn' : 'nghiên cứu'} không tồn tại`);
                  this.router.navigate([`/admin/${this.collection}/list`], { queryParams: { page: 1}});
                }

              })

          }


        }

      }


    )
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
      $(".app-btn").prop('disabled', false)
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
  collection = 'consultancy';
  collectionRecord: Object;
  routingUrl: string;

  uploadFiles() {

    if (!this.collectionRecord || !this.collectionRecord['_id'])
      return;
    console.log(this.collectionRecord);
    this.uploader.setOptions({

      url: this.url + `?collection=${this.collection}&collectionID=${this.collectionRecord['_id']}`

    })

    this.uploader.uploadAll();

  }

}
