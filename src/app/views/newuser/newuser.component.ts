import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { LocalStorageService } from '../../services/LocalStorageService';
import { AppSettings } from '../../models/AppSettings';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {H4rbaseComponent} from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent extends H4rbaseComponent {
	
	public user: User = new User();
	public selfEditUserProfile:boolean = false;
	public fileToUpload: File = null;
	private avatar:any = null;//require("../../assets/img/logo.png");
	
  	constructor(private userService: UserService
  			, private router: Router
  			, private route: ActivatedRoute 
  			, private localStorageService: LocalStorageService
  			, private logger: LoggingService
  			, public loginService: LoginService) {
				  super(loginService);
  	}
  	
  	ngOnInit() {
  		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.feature == -1) {//login user profile edit
  				that.selfEditUserProfile = true;
  				that.user = JSON.parse(this.localStorageService.getItem('user'));
  				that.user.message = "";
  				that.user.errorMessage = "";
  				that.avatar = that.user.avatar;//AppSettings.H4R_BACKEND_URL + that.user.avatar;
  				this.logger.log(this,"User wants to edit his/her own profile " +  that.user.id); 
  			} else if(res.feature > 0) {
  				//if not -1, then it is a userId 
  				this.userService.get(res.feature).subscribe(resp => {
	  				that.user = resp;
  					that.user.message = "";
	  				that.user.errorMessage = "";
	  				that.avatar = that.user.avatar;;//AppSettings.H4R_BACKEND_URL + that.user.avatar;
	  				this.logger.log(this,"User wants to edit someother user profile, userID=" + that.user.id);
  				},
  				err => {
  					
  				});
  			}
  			/**
  			let role:number = AppSettings.TENANT + AppSettings.LAND_LORD;
  			this.logger.log(this, "isTenant=" + ((role &  AppSettings.TENANT) ==  AppSettings.TENANT));
  			this.logger.log(this, "isLandLord=" + ((role &  AppSettings.LAND_LORD) ==  AppSettings.LAND_LORD));
  			this.logger.log(this, "isAccountant=" + ((role &  AppSettings.ACCOUNTANT) ==  AppSettings.ACCOUNTANT));
  			*/
  		});
  	}
  	
  isUserLogin() {
	  	return this.loginService.isUserLogin();
  }
  
  saveRecord() {
  		if(this.user.id !== 0) {
  			this.update();
  		} else {
  			this.create();
  		}
  	}
  	
  	create() {
  		this.logger.log(this,"Creating a new user with fname=" + this.user.fname);
  		this.userService.create(this.user).subscribe(res => {
  			this.logger.log(this,"User is successfully created");
  			this.user.message = "Successfully created user.";
  			this.router.navigate(['postupdate']);
  		},
  		err => {
  			this.logger.log(this,"problem creating the user: " + JSON.stringify(err));
  			this.user.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem creating the user";
  		});
  	}
  	
  	update() {
  		this.logger.log(this,"Udpating the user id=" + this.user.id);
  		this.userService.update(this.user).subscribe(res => {
  			this.logger.log(this,"Successfully updated");
  			this.user.message = "Successfully updated the user.";
  			if(this.selfEditUserProfile === true)
  				this.localStorageService.setItem('user', JSON.stringify(res));
  			this.router.navigate(['postupdate']);
  		},
  		err => {
  			this.logger.log(this,"Problem updating the user: " + JSON.stringify(err));
  			this.user.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem updating the user";
  		});
  	}
  	
  	handleFileInput($event) {
  		var files:FileList = $event.target.files;
  		var file = files.item(0);
  		var content:any = null;
  		
  		if(file == undefined)
  	    	return; //do nothing, no file attached. 
  		var name = file.name;
  	    var size = file.size;
  	    var type = file.type;
  	    var reader = new FileReader();
  	    let that = this;
  	    reader.onload = function(readerEvt:any) {
  	    	content = btoa(readerEvt.target.result);
  	    	//this.logger.log(this,name +":"+size+":"+type);
  	    	var avatar:any = {data:null,filename:null,content_type:null};
  	    	avatar.data = content;
  	    	avatar.filename = name;
  	    	avatar.content_type = type;
  	    	that.user.avatar = avatar;
  	    	that.logger.log(this,"avatar::", that.user.avatar);
  	    };
  	    reader.readAsBinaryString(file);
	}
	  
	fileUploadImageClicked() {
		document.getElementById('fileUpload').click();
	}

	changeGender(type) {
		this.user.sex = type;
	}

}
