import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private usersService: UsersService, public router: Router) { }


  ngOnInit(): void {
  }

  logIn() {
    let username = this.username;
    let password = this.password;

    let user = {
      username: username,
      password: password
    };

      this.usersService.logIn(user).subscribe(
        (response) => {
          this.usersService.setCookieUser(response);
          console.log('response: ', response);
          setTimeout(() => {
            location.assign('/'); // I use the location method because the router does not reload the page
          }, 1500); 
        },
        (error) => {
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 3500);
          console.log('error: ', error);
        }
      );
  }

}
