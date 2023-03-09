import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.css']
})
export class BookSeatsComponent {
  seatForm!: FormGroup
  seats = [...Array(100).keys()];
  bookedSeats: any = [];
  seatSelected: any = [];
  data: any;
  constructor(private fb: FormBuilder, private reqs: ApiServiceService, private route: ActivatedRoute, private router: Router) {

    this.seatForm = fb.group({
      "show_time": [''],
      "movie_name": [''],
      "theatre_name": [''],
      "booked_seats": this.fb.array([]),
      "date": [''],
      "user_mail_id": ['mkumar61293@gmail.com'],
    });

    let state = this.router?.getCurrentNavigation()?.extras;
    console.log(state)
    if (state && !('state' in state)){
      this.router.navigate(['']);
    }
    this.data = state?.state;
    this.bookedSeats = this.data['bSeats'] || [];
    delete this.data.bSeats;
    let fDate = this.data;
    this.seatForm.patchValue(fDate);
    let formArray = this.seatForm.get('booked_seats') as FormArray;
    this.seats.forEach(x => {
      if (this.bookedSeats.includes(x + 1)) {
        formArray.push(new FormControl({ value: false, disabled: true }))
      } else {
        formArray.push(new FormControl(false))
      }
    });
  }

  onChange(event: any, seat: any) {
    if (event.checked) {
      this.seatSelected.push(seat + 1);
    } else {
      const i = this.seatSelected.findIndex((x: any) => x === seat + 1);
      this.seatSelected.splice(i, 1);
    }
  }

  submit() {
    const finalForm = Object.assign({}, this.seatForm.value, {
      booked_seats: this.seatSelected
    });
    console.log(finalForm)

    this.reqs.bookSeats(finalForm).subscribe((res: any) => {
      alert(res['message']);
      this.router.navigate(['']); 
    })

  }
}
