import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperModule } from '../helper/helper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { ConsultancyDetailComponent } from './consultancy-detail/consultancy-detail.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ConsultancyAddComponent } from './consultancy-add/consultancy-add.component';

@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  declarations: [ConsultancyListComponent, ConsultancyDetailComponent, AdvancedSearchComponent, ConsultancyAddComponent]
})
export class ConsultancyModule { }
