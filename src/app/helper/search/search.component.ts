import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomHttpService } from '../../custom-http.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: CustomHttpService) { }

  sub: Subscription;

  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchText = params['searchText'];
        this.http.get('/search?searchText=' + this.searchText)
          .subscribe(data => this.data = data, err => this.data = null);
      });


  }

  mode = 'employee';
  data: Object = null;
  searchText: string;
  filterText: string;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
