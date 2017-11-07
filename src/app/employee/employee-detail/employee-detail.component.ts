import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomHttpService } from '../../custom-http.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../customer/customer';
import { AlertService } from '../../alert/alert.service';
import { EmployeeCustomerService } from '../../helper/employee-customer.service';
import { ApiService } from '../../helper/api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {

  constructor(

    private router: Router,
    private currentState: ActivatedRoute

  ) {

    if (this.router.url.includes('admin/info'))
      this.isCurrent = true;
    this.currentState.data.subscribe(item => {

      this.record = item.employee;

    })

  }

  ngOnInit() {


  }

  isCurrent = false;
  password: string;
  confirmedPassword: string;
  record: any;

}
