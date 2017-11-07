import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpService } from '../../custom-http.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private http: CustomHttpService, private router: Router) {


  }



  ngOnInit() {

    this.load('current-page');

  }

  @Input('title') titleList: Array<Object>;
  @Input('api') apiUrl: string;
  @Input()
  set page(page: number) {
    this.currentPage = Number(page);
    this.newPage = this.currentPage;
    this.startIndex = 10 * (page - 1);
    console.log(this.startIndex);
  }
  @Input() pageSize = 10;
  @Input('createDisabled') hideAddIcon = false;
  @Input('deleteDisabled') hideDeleteIcon = false;
  @Output('event') eventTrigger = new EventEmitter<Object>();

  list: Array<Object>;
  selectedItem: Object;
  currentPage: number;
  newPage: number;
  startIndex: number;
  totalSize: number;
  isFirstLoad = true;

  load(loadMode: string) {

    let url = this.apiUrl + (loadMode == 'current-page' ? `?index=${this.startIndex}&pageSize=${this.pageSize}` : '?lastPage=true');
    this.http.get(url)
      .subscribe(data => {

        this.list = data['list'] as Array<any>;
        this.totalSize = data['totalSize'];
        if (data['renew']) {
          let page = data['page'];
          this.currentPage = Number(page);
          this.newPage = this.currentPage;
          this.startIndex = 10 * (page - 1);
        }

      });


  }

  select(item) {

    this.selectedItem = item;
    this.eventTrigger.emit({

      type: 'item-clicked',
      data: item

    })

  }

  pageChange(page) {

    console.log('pageChange to ' + page);
    if (page == this.currentPage)
      return;
    this.selectedItem = null;
    this.eventTrigger.emit({

      type: 'item-refresh'

    })
    let url = this.router.url.replace(this.currentPage.toString(), page);
    this.router.navigate([url]);
    this.currentPage = Number(page);
    this.newPage = this.currentPage;
    this.startIndex = 10 * (page - 1);
    this.load('current-page');

  }



}
