import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    AlertComponent
  ],
  declarations: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
