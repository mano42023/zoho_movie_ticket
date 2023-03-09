import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {
  allData: any;
  movieData: any = {};
  constructor(private reqs: ApiServiceService, private route: Router) {

  }
  ngOnInit() {
    this.get_all_data();
  }

  get_all_data() {
    this.reqs.getAllDetails().subscribe((res: any) => {
      this.allData = res;
    });
  }
}
