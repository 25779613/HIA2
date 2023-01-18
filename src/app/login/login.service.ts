import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  constructor() { }

  login(email: string, password: string) {
    if (email == 'admin@gmail.com' && password == 'admin') {
      alert('Login successfull');
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if (email == 'user@gmail.com' && password == 'user') {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
