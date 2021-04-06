import { Component, Input, OnInit } from '@angular/core';
import { Blog } from './blog-type';
import { SightsService } from './blog-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogsDetail: Blog[] = [];

  user: any;
  page = 1;
  pageSize = 6;

  constructor(public sightsService: SightsService, private usersService: UsersService, public router: Router, public httpClient: HttpClient) {
    this.sightsService.showEdit = false;
  }

  ngOnInit(): void {
    if (this.sightsService.Blogs.length === 0)
      this.sightsService.getBlog().subscribe((d: any) => this.sightsService.Blogs = d);
  }
  
  loginClick() {
    this.router.navigate([('/login')]);
  }

  // redirects the user to the sight's detail page according to the sight's id
  viewDetail(id: any) {

    this.sightsService.detailId = id;
    if (this.sightsService.loginStatusService)
      this.sightsService.showEdit = true;

    this.router.navigate([('/blogDetail'), id]);
    window.scrollTo(0,0);
  }

}
