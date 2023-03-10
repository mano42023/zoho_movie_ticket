import { Component } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent {
  allData: any;
  movieData: any = {};
  theater: any = {};
  mDate: any = new Date().toLocaleDateString()
  dateList: any = [];
  theaterName: any = this.route.snapshot.paramMap.get('name');

  constructor(private reqs: ApiServiceService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {

  }
  ngOnInit() {
    if (this.route.snapshot.queryParams['date']) {
      this.mDate = this.convertToDate(this.route.snapshot.queryParams['date']).toLocaleDateString()
    }
    this.dateList = this.genrate_date(new Date(), 7);
    this.get_all_data();
  }

  genrate_date(start: any, days: any) {
    var end = new Date()
    end.setDate(end.getDate() + days);
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr
  };

  create_data() {
    for (let i of this.allData['theatre']) {
      let temp: any = {};
      for (let j of ['1', '2', '3', '4']) {
        let name = i['show' + j + '_movie'];
        if (!(name in temp)) {
          temp[name] = [];
        }
        temp[name].push({ 'index': j, 'time': i['show' + j + '_time'] })
      }
      i['shows'] = temp;
    }
    for (let i of this.allData['movies']) {
      this.movieData[i['movie_name']] = i;
    }

    let show = this.allData['theatre'].filter((x: any) => x.theatre_name == this.theaterName)
    if (show) {
      this.theater = show[0];
    }

  }

  get_all_data() {
    this.reqs.getAllDetails().subscribe((res: any) => {
      this.allData = res;
      this.create_data();
    });
  }

  convertToDate(dateString: string) {
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }

  chage_date() {
    this.router.navigate([], {
      queryParams: {
        date: this.mDate
      },
      queryParamsHandling: 'merge',
    });
  }


  validate(showTime: any) {
    let d = this.mDate.split('/');
    let h = showTime.split(':');

    let date = parseInt(d[0]);
    let month = parseInt(d[1]) - 1;
    let year = parseInt(d[2]);

    let min = parseInt(h[1].split(' ')[0])
    let am_pm = h[1].split(' ')[1];
    // let hour = am_pm == 'AM' ? parseInt(h[0]) : parseInt(h[0]) + 12
    let hour = 0;
    if (am_pm == 'AM') {
      hour = parseInt(h[0]);
      if (h[0] == '12'){
        hour=0;
      }
    } else {
      hour = parseInt(h[0])
      if (h[0] == '12'){
        hour=12;
      }
    }

    let date1 = new Date(year, month, date, hour, min).getTime();
    let date2 = new Date().getTime();
    if (date1 > date2) {
      return false;
    }
    return true;
  }

  open_seats(theatre_name: any, movie_name: any, show: any, booked_seats: any) {
    let time = show.time;
    let index = show.index;
    let booked = [];
    let bSeats = [];
    if (booked_seats) {
      booked = booked_seats.filter((x: any) => x.date == this.mDate && x['show' + index + '_time'] == time);
    }
    if (booked.length) {
      bSeats = JSON.parse(booked[0]['show' + index + '_booked_seats']);
    }

    this.router.navigateByUrl('/seats', {
      state: {
        'theatre_name': theatre_name,
        'movie_name': movie_name,
        'show_time': time,
        'date': this.mDate,
        'bSeats': bSeats
      }
    });

    // let popup = this.dialog.open(BookSeatsComponent, {
    //   width: '95%',
    //   data: {
    //     'theatre_name': theatre_name,
    //     'movie_name': movie_name,
    //     'show_time': time,
    //     'date': this.mDate,
    //     'bSeats': bSeats
    //   }
    // });
    // popup.afterClosed().subscribe(result => {
    //   this.get_all_data();
    // });
  }
}
