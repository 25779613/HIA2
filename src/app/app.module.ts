import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { InitService } from './init.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HoverDirective } from './hover.directive';
import { EmailvalidatorDirective } from './emailvalidator/emailvalidator.directive';
import { RoomsModule } from './rooms/rooms.module';
import { HeaderModule } from './header/header.module';
import { RouteConfigToken } from './services/routeConfig.service';

// to load a config before the program intializes
// to register the function, add under providers in this class
function initFactory(initService: InitService) {
  return () => initService.init(); // returns a service
}
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    EmployeeComponent,
    AppNavComponent,
    NotfoundComponent,
    LoginComponent,
    HoverDirective,
    EmailvalidatorDirective,

  ],
  imports: [
    BrowserModule,
    //RoomsModule, // removed from imports due lazy loading
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HeaderModule,
  ],
  providers: [
    {
      //App config
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    {
      //route config under serives
      provide: RouteConfigToken,
      useValue: { title: 'Home' },
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,// plug in this method
      useFactory: initFactory,//
      deps: [InitService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
