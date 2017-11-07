import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';
import { HttpConnectionService } from '../utils/http-connection.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private conn: HttpConnectionService) {

    this.conn.get('/employees/current/info')
      .subscribe(data => this.admin = data);

  }

  ngOnInit() {
  }

  admin: Object;

}
