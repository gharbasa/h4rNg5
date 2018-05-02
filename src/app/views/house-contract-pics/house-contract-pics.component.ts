import { Component, OnInit, Input } from '@angular/core';
import { HouseContract } from '../../models/HouseContract';
import { UserHouseContractPicService } from '../../services/UserHouseContractPicService';
import { UserHouseContractPic } from '../../models/UserHouseContractPic';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ZoomPicAlbumComponent } from '../zoom-pic-album/zoom-pic-album.component';

@Component({
  selector: 'h4r-house-contract-pics',
  templateUrl: './house-contract-pics.component.html',
  styleUrls: ['./house-contract-pics.component.scss']
})
export class HouseContractPicsComponent implements OnInit {

	@Input() houseContract:HouseContract;
	private houseContractPics:Array<UserHouseContractPic> = [];
	private viewIndex:number = 0;
	private newHouseContractPic:UserHouseContractPic = new UserHouseContractPic();
	private errorMessage:string = "";
	private imageWidth:number = 300;
	private imageHeight:number = 350;
	
	constructor(private userHouseContractPicService: UserHouseContractPicService
					, private logger: LoggingService
					, private dialog: MatDialog) { 
		
	}
	
	ngOnInit() {
	}
	
	ngOnChanges() {
	//ngAfterContentInit() {
		let that = this;
		if(this.houseContract.id == 0) return;
		this.logger.log(this,"HouseContractPics id=" + this.houseContract.id);
		this.fetchHouseContractPics();
	}
	
	fetchHouseContractPics() {
		let that = this;
		this.houseContractPics = [];
		this.viewIndex = 0;
		this.newHouseContractPic = new UserHouseContractPic();
		this.userHouseContractPicService.list(this.houseContract.id).subscribe(resp => {
			for(var i in resp) {
				var row = resp[i];
				row.image = AppSettings.H4R_BACKEND_URL + row.picture;
				that.houseContractPics.push(row);
			}
			that.newHouseContractPic.user_house_contract_id = that.houseContract.id;
			
			this.logger.log(this, "Number of House Contract Pics=" +  that.houseContractPics.length);
		},
		err => {
			this.logger.log(this, "Error fetching house contract pics associated with the houseContract=" +  this.houseContract.id);	
		});
	}
	
	prevImage() {
		if(this.viewIndex > 0) {
			this.viewIndex--;
		} else this.viewIndex = this.houseContractPics.length - 1;
		this.logger.log(this, "Previous image index=" +  this.viewIndex);
		return false;
	}
	
	nextImage() {
		if(this.viewIndex < this.houseContractPics.length-1) {
			this.viewIndex++;
		} else this.viewIndex = 0;
		this.logger.log(this, "Next image index=" +  this.viewIndex);
		return false;
	}
	
	handleFileInput($event: any) {
  		this.errorMessage = "";
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
  	    reader.onload = function(readerEvt:any) {
  	    	content = btoa(readerEvt.target.result);
  	    	that.logger.log(this, name +":"+size+":"+type);
  	    	var picturePayload:any = {data:"",filename:"",content_type:""};
  	    	picturePayload.data = content;
  	    	picturePayload.filename = name;
  	    	picturePayload.content_type = type;
  	    	that.newHouseContractPic.picture = picturePayload;
  	    	that.logger.log(this,"Picture going to add is ", picturePayload.filename);
  	    };
  	    reader.readAsBinaryString(file);
  	}
	
	attachContractPic() {
		this.logger.log(this,"Sending new pic to the server to save against the home " + this.newHouseContractPic.user_house_contract_id);
		let that = this;
		this.userHouseContractPicService.add(this.houseContract.id, this.newHouseContractPic).subscribe(resp => {
			that.logger.log(this,"Successfully attached the pic to the house " + this.newHouseContractPic.user_house_contract_id);
			that.fetchHouseContractPics();
		}, err => {
			that.logger.error(this,"Error in saving the new pic to the house " + this.newHouseContractPic.user_house_contract_id);
			that.errorMessage = err.error.errorMessage;
		});
	}
	
	deleteImage() {
		this.logger.log(this,"User wants to delete the image at index " + this.viewIndex);
		let that = this;
		var currentHouseContractPic = this.houseContractPics[this.viewIndex];
		this.userHouseContractPicService.remove(this.houseContract.id, currentHouseContractPic.id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the pic");
			that.fetchHouseContractPics();
		}, err => {
			that.logger.error(this,"Error deleting the pic");
		});
		return false;
	}
	
	zoom() {
		let that = this;
		let dialogRef = this.dialog.open(ZoomPicAlbumComponent, {
			//width: '500px',
			data: { housePics: this.houseContractPics}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The house-contract-pics dialog is closed');
			//this.animal = result;
			dialogRef = null;
		});
	}

	fileUploadImageClicked() {
		document.getElementById('fileUpload').click();
	}
}
