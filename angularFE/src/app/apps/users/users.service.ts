import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  
  User: object = {};

  // calls the logIn API
  public logIn(user: any): Observable<any> {
    return this.httpClient.post('/api/users/login', user);
  }

  // when the user chooses to log out, from the FE side I delete the cookies set for the session and the call the logOut API
  public logOut(): Observable<any> {
    this.cookieService.delete( 'user');
    this.cookieService.delete( 'name');
    return this.httpClient.get('/api/users/logout');
  }

  // returns the user currently logged in if any is
  public getUserFromCookies(user: any) {
    if (this.cookieService.get(user) == '') {
      return undefined;
    }
    return this.cookieService.get(user);
  }

  // sets up the session of the user via cookies services
  public setCookieUser(user: any) {
    this.cookieService.set( 'user', JSON.stringify(user));
    this.cookieService.set( 'permissions', user.permissions);
    console.log('setCookieUser: ', user);
    this.cookieService.set( 'name', user.username);
  }

  // return if the currently logged in user(if any) is an admin by examining each user's permissions
  public isAdmin() {
    let cookieUser = this.getUserFromCookies('user');
    if (cookieUser === undefined) {
      return false;
    } else if (!(JSON.parse(cookieUser).permissions.write)) {
      return false;
    } else {
      return true;
    }
  }

}
