import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  url = '/documents';

  constructor(
    private http: CustomHttpService,
    private alert: AlertService,
    private router: Router,
    private currentState: ActivatedRoute) {

   

  }

  ngOnInit() {

  }

}
