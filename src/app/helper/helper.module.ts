import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeCustomerService } from './employee-customer.service';
import { ApiService } from './api.service';
import { SearchComponent } from './search/search.component';
import { SharedMemoryService } from './shared-memory.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { AccessControlComponent } from './access-control/access-control.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    TableComponent,
    AccessControlComponent,
    TitleComponent
  ],
  declarations: [TableComponent, SearchComponent, FilterPipe, AccessControlComponent, TitleComponent],
  providers: [EmployeeCustomerService, ApiService, SharedMemoryService]
})
export class HelperModule { }
