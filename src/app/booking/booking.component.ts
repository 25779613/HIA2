import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

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
  //Activated route - provides the id generated from the dynamic route
  constructor(private configService: ConfigService, private fb: FormBuilder,
    private bookingService: BookingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //take room id from route, from param gets the room id
    const roomId = this.route.snapshot.paramMap.get('roomId');
    this.bookingForm = this.fb.group({
      //{ value: '2' ,disabled : true} adds a default value that cant be edited
      // { validators:[Validators.required] } to add validation
      roomId: new FormControl({ value: roomId, disabled: true }, { validators: [Validators.required] }), //either use new FormControl('') | [''] (short version)
      guestEmail: ['', {
        updateOn: 'blur' //blur is an event that fires when you move out of the control
        , validators: [Validators.required, Validators.email]
      }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['',
        [Validators.required, Validators.minLength(5)
          , CustomValidator.validateName, CustomValidator.validateSpecialChar("*")]],
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
      // will updateOn blur (move out of control) globally(for each control) //options -blur-submit-change\
    }, { updateOn: "blur", validators: [CustomValidator.validateDate] });

    this.getBookingData();
    // // get data in real time, called for each key press
    // this.bookingForm.valueChanges.subscribe((data) => { console.log(data); });

    //RxJs mapping Opperator
    // this.bookingForm.valueChanges
    //   .subscribe((data) => {
    //     this.bookingService.bookRoom(data)
    //       .subscribe((data) => { })
    //   });


    //mergeMap - doesnt care of sequence, will subscribe(post) to the stream as soon as data available
    // this.bookingForm.valueChanges.pipe(mergeMap((data) => this.bookingService.bookRoom(data))).subscribe((data) => { console.log(data) });

    //switchMap- will cancel existing requests(post) if it recieves new (latest data),previous stream will be cancelled
    // this.bookingForm.valueChanges.pipe(switchMap((data) => this.bookingService.bookRoom(data))).subscribe((data) => { console.log(data) });

    //exhaustMap - cares about sequence, if previous request is not completed will not subscribe changes
    // this.bookingForm.valueChanges.pipe(exhaustMap((data) => this.bookingService.bookRoom(data))).subscribe((data) => { console.log(data) });

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
    // //post to api
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
    //   console.log(data)});


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

  // recieving data from api, patchValue allows to skip values of control, setValue requires all values of controls
  getBookingData() {
    this.bookingForm.patchValue({
      //roomId: "2 ",
      guestEmail: "test@gmail.com",
      checkinDate: new Date('10-Feb-2010'),
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
    });
  }


}
