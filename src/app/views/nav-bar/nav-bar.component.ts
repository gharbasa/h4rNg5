import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';

import { LocalStorageService } from '../../services/LocalStorageService';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';
import { IdleService } from '../../services/IdleService';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { HouseService } from '../../services/HouseService';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  extends H4rbaseComponent {

	constructor(protected localStorageService: LocalStorageService
		  ,private router: Router
		  ,public loginService: LoginService
		  ,private logger: LoggingService
		  ,private idleService: IdleService
		  ,private houseService: HouseService){ 
			  super(loginService);
		  }
  //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
  //@Output() onLogoutClick = new EventEmitter<string>();
  public search:string = "";
  ngOnInit() {
	  
  }
  
  logoutClicked() {
	  this.idleService.logout();
	  this.resetLocalBuffer();
	  return false;
  }

	houseSearch() {
		this.houseService.setSearchKeyword(this.search);
		if(AppSettings.CLOUD_SEARCH == true) {
			if(this.router.url === "/cloudsearch")
				this.router.navigate(['cloudsearch2']);
			else
				this.router.navigate(['cloudsearch']);	
		} else  {
			if(this.router.url === "/hsearch")
				this.router.navigate(['hsearch2']);
			else
				this.router.navigate(['hsearch']);
		}
  	}
  
}
