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

  public logIn(user: any): Observable<any> {
    return this.httpClient.post('/api/users/login', user);
  }

  public logOut(): Observable<any> {
    this.cookieService.delete( 'user');
    console.log('this.cookieServiceAfterDeletion: ', this.cookieService.get('user'));
    this.cookieService.delete( 'name');
    return this.httpClient.get('/api/users/logout');
  }

  public getUserFromCookies(user: any) {
    if (this.cookieService.get(user) == '') {
      return undefined;
    }
    return this.cookieService.get(user);
  }

  public setCookieUser(user: any) {
    this.cookieService.set( 'user', JSON.stringify(user));
    this.cookieService.set( 'permissions', user.permissions);
    console.log('setCookieUser: ', user);
    this.cookieService.set( 'name', user.username);
  }

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
