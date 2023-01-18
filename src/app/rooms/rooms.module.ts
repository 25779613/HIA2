import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsAddTemplateDrivenComponent } from './rooms-add-template-driven/rooms-add-template-driven.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RouteConfigToken } from '../services/routeConfig.service';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
  ],
  providers: [{

    provide: RouteConfigToken,
    useValue: { title: 'Room' },
  }
  ],
})
export class RoomsModule { }
