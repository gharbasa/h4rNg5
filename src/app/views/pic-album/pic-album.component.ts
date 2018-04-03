import { Component, OnInit, Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-pic-album',
  templateUrl: './pic-album.component.html',
  styleUrls: ['./pic-album.component.scss']
})
export class PicAlbumComponent implements OnInit {

	@Input() housePic:any; 
	constructor(private logger: LoggingService) { 
		
	}

	ngOnInit() {
		this.logger.log(this, "Showing the pic " + this.housePic.image);
	}

}
