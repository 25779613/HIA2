import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddTemplateDrivenComponent } from './rooms-add-template-driven/rooms-add-template-driven.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomGuard } from './guards/room.guard';

//nested route, to load html in same page using children:[ {path} ]
const routes: Routes = [
  {
    path: '', component: RoomsComponent,
    canActivateChild: [RoomGuard],
    children: [
      { path: 'add', component: RoomsAddTemplateDrivenComponent },
      //{ path: ':roomid', component: RoomsBookingComponent },
    ]
  },//remove rooms/ because its alread in rooms

  //{ path: 'rooms/add', component: RoomsAddTemplateDrivenComponent },// template form
  //{ path: 'rooms/:roomid', component: RoomsBookingComponent },//dynamic routing check rooms-list component html path after the/: can be named anything

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
