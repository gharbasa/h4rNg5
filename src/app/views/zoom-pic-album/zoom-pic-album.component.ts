import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-zoom-pic-album',
  templateUrl: './zoom-pic-album.component.html',
  styleUrls: ['./zoom-pic-album.component.scss']
})
export class ZoomPicAlbumComponent {

	private housePics:any = [];
	private viewIndex:number = 0;
	private imageWidth:number = 400;
	private imageHeight:number = 500;

  	constructor(public dialogRef: MatDialogRef<ZoomPicAlbumComponent>,
  			  @Inject(MAT_DIALOG_DATA) public data: any,
  			  private logger: LoggingService) { 
  		this.housePics = data.housePics;
  		logger.info(this, "Number of house pics=" + this.housePics.length);
  	}
  	
  	prevImage() {
		if(this.viewIndex > 0) {
			this.viewIndex--;
		} else this.viewIndex = this.housePics.length - 1;
		this.logger.log(this, "Previous image index=" +  this.viewIndex);
		return false;
	}
	
	nextImage() {
		if(this.viewIndex < this.housePics.length-1) {
			this.viewIndex++;
		} else this.viewIndex = 0;
		this.logger.log(this, "Next image index=" +  this.viewIndex);
		return false;
	}

}
