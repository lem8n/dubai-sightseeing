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


  public getBlog(): Observable<any> {
    // return of(blogs);
    return this.httpClient.get('/api/sights');
  }

  public updatePost(sight: any) {
    return this.httpClient.put('/api/sights/:id', sight);
  }

  public deletePost(id: number) {
    this.Blogs = this.Blogs.filter(b => b.objectId !== id);
  }

}
