import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpConnectionService } from './http-connection.service';
import { AuthService } from './auth.service';
import { SocketConnectionService } from './socket-connection.service';
import { RouterModule } from '@angular/router';
import { CONFIG } from './config';
import { Router } from './router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
   // RouterModule.forRoot(Router.INSTANCE),
    NgbModule
  ],
  //exports: [RouterModule],
  declarations: [NotificationComponent],
  providers: [HttpConnectionService, AuthService, SocketConnectionService, NotificationService]
})
export class UtilsModule { }
