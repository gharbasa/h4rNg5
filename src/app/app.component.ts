import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { LoginService } from './services/login.service';
import { Usersession } from './models/Usersession';

import { AppSettings } from './models/AppSettings';
import { AppSettingsService } from './services/AppSettingsService';
import { LocalStorageService } from './services/LocalStorageService';
import { Router } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';
import { IdleService } from './services/IdleService';

@Component({
  selector: 'h4r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Gharbasa-O';
  userLoggedin:boolean = false;
  //public usersession: Observable<Usersession>;
  //public usersession: Usersession = new Usersession("","");
  
  constructor(private loginService: LoginService
		  		, private localStorageService: LocalStorageService
		  		, private router: Router
		  		, private logger: LoggingService
          , private idleService: IdleService) {
	  this.logger.log(this,"AppComponent C'tor");
    let that = this;
    loginService.get().subscribe(res => {
    	this.logger.log(this,"Looks like usersession is still alive");
        that.localStorageService.setItem('user', JSON.stringify(res));
        this.router.navigate(['postlogin']);
        this.idleService.startIdleService();
        //Do not show login dialog
    },
    err => {
    	this.logger.error(this,'Error occurred while retrieving user session, taking user to the login screen', err);
            that.localStorageService.removeItem('user');
            this.router.navigate(['login']);
    });
  }
}
