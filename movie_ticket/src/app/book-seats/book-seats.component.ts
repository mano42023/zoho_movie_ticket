import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';


@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.css']
})
export class BookSeatsComponent {
  seatForm!: FormGroup
  seats = [...Array(100).keys()];
  constructor(public MatDialogRef: MatDialogRef<BookSeatsComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private reqs: ApiServiceService) {

    this.seatForm = fb.group({
      "show_time": [''],
      "movie_name": [''],
      "theatre_name": [''],
      "booked_seats": this.fb.array([]),
      "date": [''],
      "user_mail_id": ['mkumar61293@gmail.com'],
    });

    this.seatForm.patchValue(data);
    let formArray = this.seatForm.get('booked_seats') as FormArray;
    this.seats.forEach(x => formArray.push(new FormControl(false)));
  }

  submit() {
    console.log(this.seatForm.value)
    const finalForm = Object.assign({},
      this.seatForm.value, {
      booked_seats: this.seats.filter((x, i) => !!this.seatForm.value.booked_seats[i]).map(i => i + 1)
    });
    console.log(finalForm)

    this.reqs.bookSeats(finalForm).subscribe((res: any) => {
      alert(res['message'])
    })

  }
}
