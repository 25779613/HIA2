import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

// to use a can Activate guard insert within a path -canActivate: [LoginGuard]
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [LoginGuard] },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  }, // lazy loading
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
    // canActivate: [LoginGuard]
  },// setting up default path check app-nav html
  { path: '**', component: NotfoundComponent },// wildcard route incase url doesnt exist
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
