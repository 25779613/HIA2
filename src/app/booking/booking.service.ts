import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// pulling data from api 
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //register httpClientModule in feature module
  constructor(private http: HttpClient) { }

  bookRoom(booking: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', booking)
  }
}
