import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';

import { LocalStorageService } from '../../services/LocalStorageService';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

	private userPic:string = ""; 
	private userName:string = "";
	private notifications:any = [];
	constructor(protected localStorageService: LocalStorageService
		  ,private router: Router
		  ,private loginService: LoginService
		  ,private logger: LoggingService){ }
  //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
  //@Output() onLogoutClick = new EventEmitter<string>();
  
  ngOnInit() {
  }
  
  logoutClicked() {
	  let that = this;
	  
	  let userJSON = this.localStorageService.getItem('user');
	  let user = JSON.parse(userJSON);
	  let userId = user.id;
	  this.logger.log(this,"User wants to logout userId=" + userId);    
	  that.loginService.remove(userId).subscribe(res => {
		  this.logger.log(this,"Logout successful");
		  that.localStorageService.removeItem('user');
		  this.router.navigate(['login']);
	  }
	  ,err => {
		  this.logger.error(this,"Somehow Logout failed.");
		  that.localStorageService.removeItem('user');
		  this.router.navigate(['login']);
	  });
	  
	  return false;
  }
  
  isUserLogin() {
	  	let user = this.loginService.getCurrentUser();
	    if(user != null) {
	    	this.userPic = AppSettings.H4R_BACKEND_URL + user.avatar;
	    	this.userName = user.lname + ", " + user.fname;
	    	this.notifications = this.loginService.getNotifications();
	    } else {
	    	return false;
	    }
	    return true;
  }
  
  isAdminUser() {
	  return this.loginService.isAdminUser();
  }
}
