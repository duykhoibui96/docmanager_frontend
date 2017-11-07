import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HelperModule } from '../helper/helper.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../helper/api.service';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeInfoComponent } from './employee-detail/employee-info/employee-info.component';
import { EmployeeCustomerListComponent } from './employee-detail/employee-customer-list/employee-customer-list.component';
import { EmployeeConsultancyListComponent } from './employee-detail/employee-consultancy-list/employee-consultancy-list.component';
import { EmployeeStudyListComponent } from './employee-detail/employee-study-list/employee-study-list.component';
import { EmployeeInstructionListComponent } from './employee-detail/employee-instruction-list/employee-instruction-list.component';
import { EmployeeSeminarListComponent } from './employee-detail/employee-seminar-list/employee-seminar-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HelperModule,
    RouterModule,
    NgbModule
  ],
  declarations: [EmployeeListComponent, EmployeeDetailComponent, EmployeeAddComponent, EmployeeInfoComponent, EmployeeCustomerListComponent, EmployeeConsultancyListComponent, EmployeeStudyListComponent, EmployeeInstructionListComponent, EmployeeSeminarListComponent]
})
export class EmployeeModule { }
