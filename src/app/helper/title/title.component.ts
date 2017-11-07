import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(private router: Router, private current: ActivatedRoute) { }

  ngOnInit() {

    if (this.router.url.includes('admin/info'))
      this.isCurrent = true;

  }

  @Input() title: string;
  @Input() mode: string;
  @Input() url: string;

  isCurrent = false;

  queryParams = {

    page: 1,
    v: Date.now()

  }

  moveToList() {

    console.log(this.router.url);
    if (this.router.url.includes('create_new'))
      this.router.navigate(['../list'], { queryParams: { page: 1 }, relativeTo: this.current }, )
    else
      this.router.navigate(['../../list'], { queryParams: { page: 1 }, relativeTo: this.current })

  }
}
