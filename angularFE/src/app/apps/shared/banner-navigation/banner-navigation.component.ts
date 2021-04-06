import { Component, OnInit } from '@angular/core';
import { SightsService } from '../../blog/blog-service.service';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css']
})
export class BannerNavigationComponent implements OnInit {

  user: any;

  constructor(public sightsService: SightsService, public router: Router, public httpClient: HttpClient, public usersService: UsersService) {

  }

  ngOnInit(): void {

    const cookieUser = this.usersService.getUserFromCookies('user');

    console.log('cookieUser: ', cookieUser);

    if (cookieUser !== undefined) {
      this.user = JSON.parse(cookieUser).username;
      console.log('cookieUserAfter: ', cookieUser);
    }
  }

  loginClick() {
    this.router.navigate([('/login')]);
  }

  logOut() {
    this.usersService.getUserFromCookies('user');
    this.usersService.logOut().subscribe();
    console.log('location.pathname.substring(1): ', location.pathname.substring(1));
    if (location.pathname.substring(1) === '') {
      location.reload();
    } else if (location.pathname.substring(1).includes('blogDetail')) {
      location.assign('/');
    }
      
  }
  
}
