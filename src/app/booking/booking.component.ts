import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;
  numOfGuests: number = 1;
  // gets all the guests in the form group as a form array
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  //inject formbuilder
  constructor(private configService: ConfigService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      //{ value: '2' ,disabled : true} adds a default value that cant be edited
      // { validators:[Validators.required] } to add validation
      roomId: new FormControl({ value: '2', disabled: true }, { validators: [Validators.required] }), //either use new FormControl('') | [''] (short version)
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5)]],
      //form within a form
      address: this.fb.group({
        addressLineOne: ['', [Validators.required,]],
        addressLineTwo: [''],
        city: ['', [Validators.required,]],
        state: ['', [Validators.required,]],
        country: [''],
        zipCode: [''],
      }),
      // guest consists of a form array ,that contains all the form group of guests names and ages
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] })

    });
  }

  // reusable code 
  addGuestControl() {
    return this.fb.group({ guestName: ['', [Validators.required]], age: new FormControl('') })
  }
  // appends a guest to the array of guests
  // dynamically adds a guest to an array of guests
  addGuest() {
    this.guests.push(this.addGuestControl());
    this.numOfGuests = this.numOfGuests + 1;
  }

  //dynamically removes a guest
  removeGuest(i: number) {
    this.guests.removeAt(i);
    this.numOfGuests = this.numOfGuests - 1;

  }

  //dynamically add control
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  //dynamically remove control
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }


  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // reset the form and give default values
    this.bookingForm.reset({
      roomId: "2 ",
      guestEmail: " ",
      checkinDate: " ",
      checkoutDate: " ",
      bookingStatus: " ",
      bookingAmount: " ",
      bookingDate: " ",
      mobileNumber: " ",
      guestName: " ",
      //form within a form
      address: {
        addressLineOne: " ",
        addressLineTwo: " ",
        city: " ",
        state: " ",
        country: " ",
        zipCode: " ",
      },
      // guest consists of a form array ,that contains all the form group of guests names and ages
      guests: [],
      tnc: false,
    })
  }


}
