import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../utils/auth.service';

@Injectable()
export class RoutingGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (state.url.includes('checkin')) {
      if (this.auth.TOKEN == null)
        this.router.navigate(['login']);
      else if (this.auth.role == 'admin')
        this.router.navigate(['admin']);
      else
        this.router.navigate(['user']);
      return false;
    }


    if (state.url.includes('admin') && this.auth.role != 'admin'){

      //this.alert.sendMessage("warning","Không có quyền truy cập vào tài liệu này")
      return false;

    }

    if (state.url == '/login')
      this.auth.clear();

    return true;
  }
}
