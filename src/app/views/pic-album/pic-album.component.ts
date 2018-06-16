import { Component, OnInit, Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import { UtilityService } from '../../services/UtilityService';

@Component({
  selector: 'h4r-pic-album',
  templateUrl: './pic-album.component.html',
  styleUrls: ['./pic-album.component.scss']
})
export class PicAlbumComponent implements OnInit {

	@Input() housePic:any;
	@Input() imageWidth:number;
	@Input() imageHeight:number;

	constructor(private logger: LoggingService, private utilityService: UtilityService) { 

	}

	ngOnInit() {
		this.logger.log(this, "Showing the pic " + this.housePic.image);
		if(this.housePic && this.housePic.image) {
			this.logger.log(this, "Massaging image url " + this.housePic.image);

			this.housePic.modifyImageUrl = UtilityService.prepareS3BucketUrl(this.housePic.image);
			this.logger.log(this, "Final aws s3 URL " + this.housePic.modifyImageUrl);
		}
	}
}
