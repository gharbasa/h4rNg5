import { Component, OnInit, Input} from '@angular/core';
import { House } from '../../models/House';
import { HousePicsService } from '../../services/HousePicsService';
import { HousePic } from '../../models/HousePic';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';

HousePicsService
@Component({
  selector: 'h4r-house-pics',
  templateUrl: './house-pics.component.html',
  styleUrls: ['./house-pics.component.scss']
})
export class HousePicsComponent implements OnInit {
	
	@Input() house:any;
	private housePics:any = [];
	private viewIndex:number = 0;
	private newHousePic:HousePic = new HousePic();
	constructor(private housePicsService: HousePicsService, private logger: LoggingService) { 
		
	}
	
	ngOnInit() {
	}
	
	ngOnChanges() {
	//ngAfterContentInit() {
		let that = this;
		if(this.house.id == 0) return;
		this.logger.log(this,"HousePics houseid=" + this.house.id);
		this.fetchHousePics();
	}
	
	fetchHousePics() {
		let that = this;
		this.housePics = [];
		this.viewIndex = 0;
		this.newHousePic = new HousePic();
		this.housePicsService.listByHouse(this.house.id).subscribe(resp => {
			for(var i in resp) {
				var row = resp[i];
				row.image = AppSettings.H4R_BACKEND_URL + row.picture;
				that.housePics.push(row);
			}
			that.newHousePic.house_id = that.house.id;
			
			this.logger.log(this, "Number of House Pics=" +  that.housePics.length);
		},
		err => {
			this.logger.log(this, "Error fetching house pics associated with the house=" +  this.house.id);	
		});
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
	
	handleFileInput($event) {
  		var files:FileList = $event.target.files;
  		var file = files.item(0);
  		var content = null;
  		if(file == undefined)
  	    	return; //do nothing, no file attached. 
  		var name = file.name;
  	    var size = file.size;
  	    var type = file.type;
  	    var reader = new FileReader();
  	    let that = this;
  	    reader.onload = function(readerEvt) {
  	    	content = btoa(readerEvt.target.result);
  	    	that.logger.log(this, name +":"+size+":"+type);
  	    	var picturePayload = {data:"",filename:"",content_type:""};
  	    	picturePayload.data = content;
  	    	picturePayload.filename = name;
  	    	picturePayload.content_type = type;
  	    	that.newHousePic.picture = picturePayload;
  	    	that.logger.log(this,"Picture going to add is ", picturePayload.filename);
  	    };
  	    reader.readAsBinaryString(file);
  	}
	
	attachHousePic() {
		this.logger.log(this,"Sending new pic to the server to save against the home " + this.newHousePic.house_id);
		let that = this;
		this.housePicsService.addHousePic(this.newHousePic).subscribe(resp => {
			that.logger.log(this,"Successfully attached the pic to the house " + this.newHousePic.house_id);
			that.fetchHousePics();
		}, err => {
			that.logger.error(this,"Error in saving the new pic to the house " + this.newHousePic.house_id);
		});
	}
	
	deleteImage() {
		this.logger.log(this,"User wants to delete the image at index " + this.viewIndex);
		let that = this;
		var currentHousePic = this.housePics[this.viewIndex];
		this.housePicsService.removeHousePic(currentHousePic.id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the pic");
			that.fetchHousePics();
		}, err => {
			that.logger.error(this,"Error deleting the pic");
		});
		return false;
	}
}
