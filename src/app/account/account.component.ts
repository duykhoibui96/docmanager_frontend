import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CustomHttpService } from '../custom-http.service';
import { HttpConnectionService } from '../utils/http-connection.service';
import { AuthService } from '../utils/auth.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  err: string;

  authObj = {

    Username: null,
    Password: null

  };

  constructor(private router: Router, private conn: HttpConnectionService, private auth: AuthService) { }

  ngOnInit() {
  }

  authenticate() {

    $(".app-btn").prop('disabled', true);
    this.conn.post('/accounts/authentication', this.authObj).subscribe(data => {

      console.log(data);
      this.auth.save(data);
      if (data.role == 'admin')
        this.router.navigate(['admin/home']);
      else
        this.router.navigate(['user']);
      $(".app-btn").prop('disabled', false);

    }, err => {

      if (err.status == 406)
        this.err = 'Tài khoản hoặc mật khẩu chưa đúng';
      else
        this.err = 'Lỗi server, vui lòng thử lại sau';
      $(".app-btn").prop('disabled', false);


    })

  }

}
