import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  //if there are multiple values use paramMap
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  id: number = 0;
  //activated route service to take the route id from the url from dynamic routing
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {


    this.router.params.subscribe((params) => { this.id = params['roomid'] }); //gets the rooom id from the url
    /* snapshot is an alternative to subscribe, difference is that it will never update the data
    , new value input will not be will not be recieved*/

    this.id = this.router.snapshot.params['roomid'];

    // //if there are multiple values use paramMap
    // this.router.paramMap.subscribe((params) => { params.get('roomid') })


  }

}
