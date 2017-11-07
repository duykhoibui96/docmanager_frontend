import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { FormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerInfoComponent } from './customer-detail/customer-info/customer-info.component';
import { CustomerEmployeeListComponent } from './customer-detail/customer-employee-list/customer-employee-list.component';
import { CustomerConsultancyListComponent } from './customer-detail/customer-consultancy-list/customer-consultancy-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HelperModule,
    RouterModule,
    NgbModule
  ],
  declarations: [CustomerListComponent, CustomerDetailComponent, CustomerAddComponent, CustomerInfoComponent, CustomerEmployeeListComponent, CustomerInfoComponent, CustomerConsultancyListComponent]
})
export class CustomerModule { }
