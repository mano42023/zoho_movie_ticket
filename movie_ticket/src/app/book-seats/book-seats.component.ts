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
  bookedSeats; any = [];
  seatSelected: any = [];
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

    this.bookedSeats = data['bSeats'];
    delete data.bSeats;
    let fDate = data;
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
      this.MatDialogRef.close(); 
    })

  }
}
