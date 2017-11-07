import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingGuard } from './routing.guard';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { AccountComponent } from '../account/account.component';
import { EmployeeListComponent } from '../employee/employee-list/employee-list.component';
import { CustomHttpService } from '../custom-http.service';
import { CustomerListComponent } from '../customer/customer-list/customer-list.component';
import { EmployeeDetailComponent } from '../employee/employee-detail/employee-detail.component';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import { CustomerDetailComponent } from '../customer/customer-detail/customer-detail.component';
import { ConsultancyListComponent } from '../consultancy/consultancy-list/consultancy-list.component';
import { ConsultancyDetailComponent } from '../consultancy/consultancy-detail/consultancy-detail.component';
import { SearchComponent } from '../helper/search/search.component';
import { AdvancedSearchComponent } from '../consultancy/advanced-search/advanced-search.component';
import { TestComponent } from '../test/test.component';
import { DocumentListComponent } from '../document/document-list/document-list.component';
import { DocumentAddComponent } from '../document/document-add/document-add.component';
import { StudyListComponent } from '../study/study-list/study-list.component';
import { StudyDetailComponent } from '../study/study-detail/study-detail.component';
import { StudyAddComponent } from '../study/study-add/study-add.component';
import { SeminarListComponent } from '../seminar/seminar-list/seminar-list.component';
import { SeminarAddComponent } from '../seminar/seminar-add/seminar-add.component';
import { SeminarDetailComponent } from '../seminar/seminar-detail/seminar-detail.component';
import { EmployeeAddComponent } from '../employee/employee-add/employee-add.component';
import { CustomerAddComponent } from '../customer/customer-add/customer-add.component';
import { ConsultancyAddComponent } from '../consultancy/consultancy-add/consultancy-add.component';
import { AdminComponent } from '../admin/admin.component';
import { EmployeeInfoComponent } from '../employee/employee-detail/employee-info/employee-info.component';
import { EmployeeCustomerListComponent } from '../employee/employee-detail/employee-customer-list/employee-customer-list.component';
import { EmployeeConsultancyListComponent } from '../employee/employee-detail/employee-consultancy-list/employee-consultancy-list.component';
import { EmployeeInstructionListComponent } from '../employee/employee-detail/employee-instruction-list/employee-instruction-list.component';
import { EmployeeSeminarListComponent } from '../employee/employee-detail/employee-seminar-list/employee-seminar-list.component';
import { EmployeeStudyListComponent } from '../employee/employee-detail/employee-study-list/employee-study-list.component';
import { CustomerInfoComponent } from '../customer/customer-detail/customer-info/customer-info.component';
import { CustomerEmployeeListComponent } from '../customer/customer-detail/customer-employee-list/customer-employee-list.component';
import { CustomerConsultancyListComponent } from '../customer/customer-detail/customer-consultancy-list/customer-consultancy-list.component';
import { DocumentManagerComponent } from '../document/document-manager/document-manager.component';
import { DocumentCreateComponent } from '../document/document-manager/document-create/document-create.component';
import { DocumentManagerListComponent } from '../document/document-manager/document-manager-list/document-manager-list.component';
import { UserComponent } from '../user/user.component';
import { CheckinComponent } from '../checkin/checkin.component';
import { DocumentAddExistedFilesComponent } from '../document/document-manager/document-add-existed-files/document-add-existed-files.component';
import { HttpConnectionService } from '../utils/http-connection.service';

@Injectable()
export class RecordResolver implements Resolve<Object> {

  constructor(private conn: HttpConnectionService, private alertService: AlertService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Object> {

    let url = null;

    if (state.url.includes('admin/info') || state.url.includes('user'))
      url = "/employees/current/info";
    else if (state.url.includes('employee'))
      url = "/employees/" + route.parent.params["id"];
    else if (state.url.includes('customer'))
      url = "/customers/" + route.params["id"];
    else if (state.url.includes('consultancy'))
      url = "/consultancies/" + route.params["id"];
    else if (state.url.includes('study'))
      url = "/studies/" + route.params["id"];
    else
      url = "/seminars/" + route.params["id"];

    return this.conn.get(url);

  }

}

@Injectable()
export class ListResolver implements Resolve<Object> {

  constructor(private conn: HttpConnectionService, private alertService: AlertService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Object> {

    let url = null;
    let searchObj = Object.assign({}, route.queryParams);

    console.log("hello" + state.url);
    if (state.url.includes('document-manager')) {
      let collection = route.params['collection'];
      let id = route.params['id'];
      url = `/documents/by-${collection}/${id}`;
      console.log("Get here");
      console.log(url);
    }
    else if (state.url.includes('customer-list'))
      url = '/employee-customer/customer-list/by-employee/' + (route.parent.params["id"] ? route.parent.params["id"] : 'current');
    else if (state.url.includes('consultancy-list')) {
      if (state.url.includes('employee'))
        url = '/employee-consultancy/consultancy-list/by-employee/' + route.parent.params["id"];
      else if (state.url.includes('admin/info') || state.url.includes('user'))
        url = '/employee-consultancy/consultancy-list/by-employee/current';
      else
        url = '/customer-consultancy/consultancy-list/by-customer/' + route.parent.params["id"];
    }
    else if (state.url.includes('study-list'))
      url = '/employee-study/study-list/by-employee/' + (route.parent.params["id"] ? route.parent.params["id"] : 'current');
    else if (state.url.includes('instruction-list'))
      url = '/employee-study/instruction-list/by-employee/' + (route.parent.params["id"] ? route.parent.params["id"] : 'current');
    else if (state.url.includes('seminar-list'))
      url = '/employee-seminar/seminar-list/by-employee/' + (route.parent.params["id"] ? route.parent.params["id"] : 'current');
    else if (state.url.includes('employee-list'))
      url = '/employee-customer/employee-list/by-customer/' + route.parent.params["id"];
    else if (state.url.includes('employee'))
      url = '/employees';
    else if (state.url.includes('customer'))
      url = '/customers';
    else if (state.url.includes('consultancy'))
      url = '/consultancies';
    else if (state.url.includes('study'))
      url = '/studies';
    else if (state.url.includes('document'))
      url = '/documents';
    else if (state.url.includes('seminar'))
      url = '/seminars';

    console.log(url);
    searchObj["index"] = 10 * (searchObj["page"] - 1);
    searchObj["pageSize"] = 10;
    delete searchObj["page"];
    delete searchObj["v"];

    return this.conn.get(url, null, searchObj);

  }

}

const routes: Routes = [
  { path: '', redirectTo: 'checkin', canActivate: [RoutingGuard], pathMatch: 'full' },
  { path: 'checkin', component: CheckinComponent, canActivate: [RoutingGuard] },
  { path: 'login', component: AccountComponent, canActivate: [RoutingGuard] },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RoutingGuard],
    runGuardsAndResolvers: "always",
    resolve: {

      employee: RecordResolver

    },
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        runGuardsAndResolvers: "always",
        resolve: {

          employee: RecordResolver

        },
        component: EmployeeInfoComponent
      },
      {
        path: 'customer-list',
        runGuardsAndResolvers: "always",
        resolve: {

          list: ListResolver

        },
        component: EmployeeCustomerListComponent
      },
      {
        path: 'consultancy-list',
        runGuardsAndResolvers: "always",
        resolve: {

          list: ListResolver

        },
        component: EmployeeConsultancyListComponent
      },
      {
        path: 'instruction-list',
        runGuardsAndResolvers: "always",
        resolve: {

          list: ListResolver

        },
        component: EmployeeInstructionListComponent
      },
      {
        path: 'seminar-list',
        runGuardsAndResolvers: "always",
        resolve: {

          list: ListResolver

        },
        component: EmployeeSeminarListComponent
      },
      {
        path: 'study-list',
        runGuardsAndResolvers: "always",
        resolve: {

          list: ListResolver

        },
        component: EmployeeStudyListComponent
      },
      {
        path: 'document-manager/:collection/:id',
        runGuardsAndResolvers: "always",
        component: DocumentManagerComponent,
        resolve: {

          list: ListResolver

        }
      }

    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoutingGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      {
        path: 'employee',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeListComponent
          },
          {
            path: 'detail/:id',
            component: EmployeeDetailComponent,
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
              },
              {
                path: 'info',
                runGuardsAndResolvers: "always",
                resolve: {

                  employee: RecordResolver

                },
                component: EmployeeInfoComponent
              },
              {
                path: 'customer-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: EmployeeCustomerListComponent
              },
              {
                path: 'consultancy-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: EmployeeConsultancyListComponent
              },
              {
                path: 'instruction-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: EmployeeInstructionListComponent
              },
              {
                path: 'seminar-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: EmployeeSeminarListComponent
              },
              {
                path: 'study-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: EmployeeStudyListComponent
              },

            ]
          },
          {
            path: 'create_new',
            component: EmployeeAddComponent,
          },

        ],
      },
      {
        path: 'customer',
        children: [

          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: CustomerListComponent
          },
          {
            path: 'detail/:id',
            component: CustomerDetailComponent,
            resolve: {

              customer: RecordResolver

            },
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
              },
              {
                path: 'info',
                component: CustomerInfoComponent,
              },
              {
                path: 'employee-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: CustomerEmployeeListComponent,
              },
              {
                path: 'consultancy-list',
                runGuardsAndResolvers: "always",
                resolve: {

                  list: ListResolver

                },
                component: CustomerConsultancyListComponent,
              }

            ]
          },
          {
            path: 'create_new',
            component: CustomerAddComponent,
          },

        ],
      },
      {
        path: 'consultancy',
        children: [

          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: ConsultancyListComponent
          },
          {
            path: 'detail/:id',
            component: ConsultancyDetailComponent,
            resolve: {

              consultancy: RecordResolver

            }
          },
          {
            path: 'create_new',
            component: ConsultancyAddComponent,
          },

        ],
      },
      {
        path: 'study',
        children: [

          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: StudyListComponent
          },
          {
            path: 'detail/:id',
            component: StudyDetailComponent,
            resolve: {

              study: RecordResolver

            }
          },
          {
            path: 'create_new',
            component: StudyAddComponent,
          },

        ],
      },
      {
        path: 'seminar',
        children: [

          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: SeminarListComponent
          },
          {
            path: 'detail/:id',
            component: SeminarDetailComponent,
            resolve: {

              seminar: RecordResolver

            }
          },
          {
            path: 'create_new',
            component: SeminarAddComponent,
          },

        ],
      },
      {
        path: 'document',
        children: [

          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: DocumentListComponent
          },
          {
            path: 'detail/:id',
            component: CustomerDetailComponent,
            resolve: {

              document: RecordResolver

            }
          },
          {
            path: 'create_new',
            component: DocumentAddComponent,
          },
          {
            path: 'document-manager/:collection/:id',
            runGuardsAndResolvers: "always",
            component: DocumentManagerComponent,
            resolve: {

              list: ListResolver

            }
          },

        ],
      },
      {
        path: 'info',
        component: EmployeeDetailComponent,
        canActivate: [RoutingGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: EmployeeInfoComponent,
            runGuardsAndResolvers: "always",
            resolve: {

              employee: RecordResolver

            },
          },
          {
            path: 'customer-list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeCustomerListComponent
          },
          {
            path: 'consultancy-list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeConsultancyListComponent
          },
          {
            path: 'instruction-list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeInstructionListComponent
          },
          {
            path: 'seminar-list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeSeminarListComponent
          },
          {
            path: 'study-list',
            runGuardsAndResolvers: "always",
            resolve: {

              list: ListResolver

            },
            component: EmployeeStudyListComponent
          },

        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    RoutingGuard,
    RecordResolver,
    ListResolver
  ]
})
export class RoutingModule { }
