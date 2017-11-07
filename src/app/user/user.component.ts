import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private current: ActivatedRoute) {

    this.current.data.subscribe(data => this.employee = data.employee);

  }

  ngOnInit() {
  }

  employee: Object;
}
