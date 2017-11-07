import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CustomHttpService } from '../custom-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedMemoryService } from '../helper/shared-memory.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private http: CustomHttpService,
    private router: Router,
    private modalService: NgbModal,
    private sharedMemory: SharedMemoryService
  ) { }

  ngOnInit() {
  }

  searchText: string;

  search() {

    this.router.navigate(['/search'], { queryParams: { searchText: this.searchText } })
      .then(() => this.searchText = '')
      .catch(() => this.searchText = '')

  }

  closeResult: string;
  collection: string = 'consultancy';
  beginTime: Object;
  endTime: Object;
  err: string;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  advancedSearch() {

    if (!this.beginTime && !this.endTime) {
      this.err = 'Phải chọn ít nhất một mốc thời gian';
      return;
    }
    this.sharedMemory.DATE_OBJECT = {

      beginTime: this.beginTime,
      endTime: this.endTime

    }
    $('#closeModal').trigger('click');
    this.router.navigate(['/consultancy/advanced-search'], { queryParams: { v: Date.now() } });

  }

}
