import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyListComponent } from './study-list/study-list.component';
import { StudyAddComponent } from './study-add/study-add.component';
import { StudyDetailComponent } from './study-detail/study-detail.component';
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
  declarations: [StudyListComponent, StudyAddComponent, StudyDetailComponent]
})
export class StudyModule { }
