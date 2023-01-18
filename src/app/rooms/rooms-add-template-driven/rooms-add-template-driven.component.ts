import { Component, OnInit } from '@angular/core';
import { roomsList } from '../rooms';
import { RoomServiceService } from '../services/room-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add-template-driven',
  templateUrl: './rooms-add-template-driven.component.html',
  styleUrls: ['./rooms-add-template-driven.component.scss']
})
export class RoomsAddTemplateDrivenComponent implements OnInit {

  successMessage: string = "";

  room: roomsList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    image: '',
    price: 0,
    rating: 0,

  };
  //call the service 
  constructor(private roomService: RoomServiceService) { }

  ngOnInit(): void {
  }

  // to submit the data to the service to make api call
  //to reset form after data has been added use the param and . resetForm();
  //inside the resetForm you can pass the default data within {}
  AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room)
      .subscribe((data) => {
        this.successMessage = "Room added successfully";
        console.log(data);
        roomsForm.resetForm(
          {

            roomNumber: '',
            roomType: '',
            amenities: '',
            checkinTime: new Date(),
            checkoutTime: new Date(),
            image: '',
            price: 0,
            rating: 0,
          }
        );
      });
  }

}
