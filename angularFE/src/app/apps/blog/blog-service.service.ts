import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { blogs } from './blog-data';


@Injectable({
  providedIn: 'root'
})
export class SightsService {

  constructor(private httpClient: HttpClient) { }

  // updateAttraction(body){
  //   return this.httpClient.put('/api/attractions', body);
  // }

  Blogs: any[] = [];
  loginStatusService = false;

  detailId: number = -1;
  showEdit = false;

  // calls the api to populate the home page with all the landmarks
  public getBlog(): Observable<any> {
    // return of(blogs);
    return this.httpClient.get('/api/sights');
  }

  // calls the api to update each sight's detail information
  public updatePost(sight: any) {
    return this.httpClient.put('/api/sights/:id', sight);
  }

}
