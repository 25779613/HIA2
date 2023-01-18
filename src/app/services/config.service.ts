import { Injectable, Inject } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';
/* any provider , will create one instance when app is initialized and then will 
create one new instance for any lazy loaded modules, useful when a difference configuration is
needed

*/
@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log('config service!!!!!!!!!!!!!!!!!!!!');
    console.log(configToken);
  }
}
