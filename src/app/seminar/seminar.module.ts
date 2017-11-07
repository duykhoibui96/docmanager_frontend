import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeminarDetailComponent } from './seminar-detail/seminar-detail.component';
import { SeminarListComponent } from './seminar-list/seminar-list.component';
import { SeminarAddComponent } from './seminar-add/seminar-add.component';
import { FormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HelperModule,
    RouterModule,
    NgbModule
  ],
  declarations: [SeminarDetailComponent, SeminarListComponent, SeminarAddComponent]
})
export class SeminarModule { }
