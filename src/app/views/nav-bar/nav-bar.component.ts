import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';

import { LocalStorageService } from '../../services/LocalStorageService';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import { IdleService } from '../../services/IdleService';

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
		  ,private logger: LoggingService
		  ,private idleService: IdleService){ }
  //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
  //@Output() onLogoutClick = new EventEmitter<string>();
  
  ngOnInit() {
	  
  }
  
  isAdmin() {
	  return this.loginService.isAdminUser();
  }
  
  logoutClicked() {
	  this.idleService.logout();
	  this.resetLocalBuffer();
	  return false;
  }
  
  isUserLogin() {
	  	let user = this.loginService.getCurrentUser();
	    if(user != null) {
	    	this.userPic = AppSettings.H4R_BACKEND_URL + user.avatar;
	    	this.userName = user.fullName;
	    	this.notifications = this.loginService.getNotifications();
	    } else {
	    	this.resetLocalBuffer();
	    	return false;
	    }
	    return true;
  }
  
  isAdminUser() {
	  return this.loginService.isAdminUser();
  }
  
  resetLocalBuffer(): void {
	this.userPic = "";
  	this.userName = "";
  	this.notifications = [];
  }
}
