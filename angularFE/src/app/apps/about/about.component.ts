import { Component } from '@angular/core';
import { SightsService } from '../blog/blog-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  

  constructor(public service:SightsService) {
    this.service.showEdit=false;
    
  }

}
