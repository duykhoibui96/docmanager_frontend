import { Component, OnInit } from '@angular/core';
import { SharedMemoryService } from '../../helper/shared-memory.service';
import { CustomHttpService } from '../../custom-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(
    private sharedMemory: SharedMemoryService, 
    private http: CustomHttpService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
  
    this.route
      .queryParams
      .subscribe(params => {
        
        console.log('subscribe');

        let dateObject = this.sharedMemory.DATE_OBJECT;
        if (!dateObject)
        {
          this.router.navigate(['home']);
          return;
        }
        let begin = dateObject['beginTime'];
        let end = dateObject['endTime'];

        this.beginTime = begin ? `${begin.day}/${begin.month}/${begin.year}` : null;
        this.endTime = end ? `${end.day}/${end.month}/${end.year}` : null;

        // Defaults to 0 if no query param provided.
        this.http.post('/consultancies/search', dateObject)
          .subscribe(data => {

            console.log(data);
            this.data = data;
          }
          , err => this.data = null);
      });

  }

  data: Array<Object>;

  beginTime: string;
  endTime: string;

}
