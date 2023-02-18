import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookSeatsComponent } from '../book-seats/book-seats.component';
import { ApiServiceService } from '../service/api-service.service';


@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {
  allData: any;
  movieData: any = {};
  dateList: any = [];
  mDate: any = new Date().toLocaleDateString()
  weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  constructor(private reqs: ApiServiceService, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.dateList = this.genrate_date(new Date(), 7);
    this.get_all_data();
  }

  get_all_data() {
    this.reqs.getAllDetails().subscribe((res: any) => {
      this.allData = res;
      this.create_data();
    });
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
    let popup = this.dialog.open(BookSeatsComponent, {
      width: '95%',
      data: {
        'theatre_name': theatre_name,
        'movie_name': movie_name,
        'show_time': time,
        'date': this.mDate,
        'bSeats': bSeats
      }
    });
    popup.afterClosed().subscribe(result => {
      this.get_all_data();
    });
  }
}
