import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentAddComponent } from './document-add/document-add.component';
import { FormsModule } from '@angular/forms';
import { HelperModule } from '../helper/helper.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective } from 'ng2-file-upload';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { DocumentCreateComponent } from './document-manager/document-create/document-create.component';
import { DocumentManagerListComponent } from './document-manager/document-manager-list/document-manager-list.component';
import { DocumentAddExistedFilesComponent } from './document-manager/document-add-existed-files/document-add-existed-files.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HelperModule,
    RouterModule,
    NgbModule
  ],
  declarations: [DocumentListComponent, DocumentAddComponent, FileSelectDirective, DocumentManagerComponent, DocumentCreateComponent, DocumentManagerListComponent, DocumentAddExistedFilesComponent]
})
export class DocumentModule { }
