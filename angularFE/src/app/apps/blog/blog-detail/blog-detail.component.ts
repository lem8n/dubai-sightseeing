import { Component, Input, OnInit } from '@angular/core';
import { SightsService } from '../blog-service.service';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog-type';
import { NgxSpinnerService } from 'ngx-spinner';

import * as _ from 'lodash';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  id: any;
  edit: boolean = false; // enables edit mode
  blogDetail: Blog | null = null;
  // sight's attributes initilized in order to be edited
  title: any;
  shortInfo: any;
  description: any;
  order: any;
  photo: any;

  imageError: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = ''; // the base64 of the image file to be used to upload it and transform it via sharp to a thumbnail

  constructor(activatedRouter: ActivatedRoute, public sightsService: SightsService, public usersService: UsersService, public router: Router, private spinner: NgxSpinnerService) {
    this.id = activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.title = this.title;
    this.shortInfo = this.shortInfo;
    this.description = this.description;
    this.blogDetail = this.sightsService.Blogs.filter(x => x.objectId === this.id)[0];
    console.log("Blogs: ", this.sightsService.Blogs);
    console.log('Blog Detail: ', this.blogDetail);
  }

  loginClick() {
    this.router.navigate([('/login')]);
  }

  // start editting the sight
  editPost() {
      this.edit = true
      this.blogDetail = this.sightsService.Blogs.filter(x => x.objectId === this.id)[0];
      let editDetails = {
        title: this.title = this.blogDetail?.title,
        shortInfo: this.shortInfo = this.blogDetail?.shortInfo,
        description: this.description = this.blogDetail?.description,
        // photo: this.photo = this.blogDetail?.photo
      };
      console.log('editDetails: ', editDetails);
      window.scroll(0,0);
  }

  // exit editting the sight
  stopEditting() {
    this.edit = false;
    window.scroll(0,0);
  }

  // updates the sigts's attributes in the database
  updatePost() {
    this.spinner.show();
      let sightDetails = {
        id: this.id,
        title: this.title,
        shortInfo: this.shortInfo,
        description: this.description,
        photo: this.cardImageBase64 || null
      };
      console.log('sightDetailsAfterUpdating: ',sightDetails);
      this.sightsService.updatePost(sightDetails).subscribe(
        (response) => {
          console.log("Succesfull Update", response);
          this.spinner.hide();
          location.assign('/');
        }
      );
  }

  // uploads the photo of each site when you edit it
  fileChangeEvent(fileInput: any) {
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const maxSize = 5242880; // 5MB
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxHeight = 15200;
        const maxWidth = 25600;

        if (fileInput.target.files[0].size > maxSize) {
            this.imageError =
                'Maximum size allowed is 5MB';

            return false;
        }

        if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = async (rs: any) => {
                const imgHeight = rs.currentTarget['height'];
                const imgWidth = rs.currentTarget['width'];

                console.log(imgHeight, imgWidth);


                if (imgHeight > maxHeight && imgWidth > maxWidth) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        maxHeight +
                        '*' +
                        maxWidth +
                        'px';
                    return false;
                } else {
                    let imgBase64Path = e.target.result;
                    
                    this.cardImageBase64 = imgBase64Path; // the base64 of the image file
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }

                return true;
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }

    return true;
  }

  // removes the image selected
  removeImage() {
      this.cardImageBase64 = '';
      this.isImageSaved = false;
  }

}
