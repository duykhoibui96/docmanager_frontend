import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoutingModule } from './routing/routing.module';
import { AuthenticationService } from './authentication.service';
import { CustomHttpService } from './custom-http.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountComponent } from './account/account.component';
import { EmployeeModule } from './employee/employee.module';
import { HelperModule } from './helper/helper.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
import { ConsultancyModule } from './consultancy/consultancy.module';
//import { ConsultancyListComponent } from './consultancy/consultancy-list/consultancy-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './helper/api.service';
import { CustomerModule } from './customer/customer.module';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { TestComponent } from './test/test.component';
import { DocumentModule } from './document/document.module';
import { MenuComponent } from './menu/menu.component';
import { StudyModule } from './study/study.module';
import { SeminarModule } from './seminar/seminar.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserHeaderComponent } from './user/user-header/user-header.component';
import { UserFooterComponent } from './user/user-footer/user-footer.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserCustomerListComponent } from './user/user-customer-list/user-customer-list.component';
import { UserConsultancyListComponent } from './user/user-consultancy-list/user-consultancy-list.component';
import { UserStudyListComponent } from './user/user-study-list/user-study-list.component';
import { UserInstructionListComponent } from './user/user-instruction-list/user-instruction-list.component';
import { UserSeminarListComponent } from './user/user-seminar-list/user-seminar-list.component';
import { CheckinComponent } from './checkin/checkin.component';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AccountComponent,
    TestComponent,
    MenuComponent,
    AdminComponent,
    UserComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserMenuComponent,
    UserInfoComponent,
    UserCustomerListComponent,
    UserConsultancyListComponent,
    UserStudyListComponent,
    UserInstructionListComponent,
    UserSeminarListComponent,
    CheckinComponent,

  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    EmployeeModule,
    AlertModule,
    ConsultancyModule,
    HttpClientModule,
    HelperModule,
    CustomerModule,
    DocumentModule,
    StudyModule,
    SeminarModule,
    UtilsModule
  ],
  providers: [AuthenticationService, CustomHttpService, ApiService, FileSelectDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
