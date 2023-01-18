import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  // switch to another view(component)
  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  Login() {
    if (this.loginService.login(this.email, this.password)) {
      alert('Login successfull');
      // redirect to another view
      // this.route.navigate(['/rooms', 'add']);
      //or
      //this.route.navigateByUrl('/rooms/add');

      this.route.navigate(['/rooms']);
    }

  }
}
