import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { LoggerService } from './logger.service';
import { InitService } from './init.service';
import { localStorageToken } from './localstorage.token';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // template: `<h1>Hello world from inline template</h1>
  // <p> Angular is awesome</p>`, //to write inline HTML

})
export class AppComponent implements OnInit {

  title = 'HotelInventoryApp2';
  role: string = "Admin";

  // access html element in ts file
  @ViewChild('name', { static: true }) name !: ElementRef;

  //optional service resolution modifier for service incase its not available
  constructor(@Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any, private initService: InitService) {
    console.log(initService.config);

  }

  ngOnInit(): void {
    this.name.nativeElement.innerText = "Hilton Hotel"
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
  /*

  //to dynamically load components
  @ViewChild('user', { read: ViewContainerRef }) vcr !: ViewContainerRef;

   

  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  }

  */
}
