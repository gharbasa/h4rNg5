import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { LoginService } from './services/login.service';
import { Usersession } from './models/Usersession';

import { AppSettings } from './models/AppSettings';
import { AppSettingsService } from './services/AppSettingsService';
import { LocalStorageService } from './services/LocalStorageService';
import { Router , NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { LoggingService, Config } from 'loggerservice';
import { IdleService } from './services/IdleService';
import { FacebookLoginProvider, AuthService, SocialUser } from "angularx-social-login";
import { User } from './models/User';

@Component({
  selector: 'h4r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  userLoggedin:boolean = false;
  private user: SocialUser;
  //public usersession: Observable<Usersession>;
  //public usersession: Usersession = new Usersession("","");
  
  constructor(private loginService: LoginService
		  		, private localStorageService: LocalStorageService
		  		, private router: Router
		  		, private logger: LoggingService
          , private idleService: IdleService
          , private authService: AuthService) {
	  this.logger.log(this,"AppComponent C'tor");
    let that = this;
    loginService.get().subscribe(res => {
      this.logger.log(this,"Looks like usersession is still alive");
        that.userLoggedin = true;
        AppSettings.loginType = AppSettings.LOGIN_TYPES.DOMESTIC;
        that.postLoginActivity(res, null);
        //Do not show login dialog
    },
    err => {
    	this.logger.error(this,'Error occurred while retrieving user session, taking user to the login screen', err);
      that.localStorageService.removeItem('user');
      this.router.navigate(['login']);
      that.checkFederatedUsersession();
    });
    
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.logger.info(this, "Hey NavigationEnd event. url=" + event.urlAfterRedirects);
        //(<any>window).ga('set', 'page', event.urlAfterRedirects);
        let vpeJson:any = {
              hitType: 'pageview',
              page: event.urlAfterRedirects
        };
        (<any>window).ga('send', vpeJson);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
    
    /*
    router.events.subscribe(event: Event => {
      if(event instanceof NavigationEnd) {
        this.logger.info(this, "Hey NavigationEnd event.url=" + event.url);
      }
    });
    */

  }
  /**
   * Following is the structure of SocialUser object provided by angularx-social-login
   * {  
   "id":"10212993370045174",
   "name":"Abed Ali",
   "email":"abedali@engineer.com",
   "photoUrl":"https://graph.facebook.com/10212993370045174/picture?type=normal",
   "firstName":"Abed",
   "lastName":"Ali",
   "authToken":"EAAaISqMjtkoBALZC9olvVE5v3wswk4Ji1jRAcKiM3wAumnAqkeywm1jE2e3hEfZBUAWz75Y173SqrWKUrmSdf4tZBQoaW6riYVSXGgq5ebKDqN7K0kXjULYBrxQGEhR8TQKUXiJXvLUO59IKEApd85ZBZCSONTQHCJA8d8XHwaugG2lsYAyTg5qfrzhaqBt7Ubpwk0jOrBQZDZD",
   "facebook":{  
      "name":"Abed Ali",
      "email":"abedali@engineer.com",
      "picture":{  
         "data":{  
            "height":50,
            "is_silhouette":false,
            "url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10212993370045174&height=50&width=50&ext=1538420231&hash=AeS94Y9jE8vvWueY",
            "width":50
         }
      },
      "first_name":"Abed",
      "last_name":"Ali",
      "id":"10212993370045174"
   },
   "provider":"FACEBOOK"
}
   */
  checkFederatedUsersession():void {
    let that = this;
    this.authService.authState.subscribe((user) => {
        that.userLoggedin = (user != null);
        if(that.userLoggedin == true) {
          that.user = user;
          that.logger.info("Hey, external app user login already, user email=" + that.user.email);
          if(that.user.provider && that.user.provider == "FACEBOOK") {
            that.logger.info("Login type is facebook");
            AppSettings.loginType = AppSettings.LOGIN_TYPES.FACEBOOK;
            that.loginService.createFederatedUserSession(that.user).subscribe(res => {
              this.logger.log(this,"facebook user login successful in application " + res.fname);
              that.postLoginActivity(res, user);
            }
            ,err => {
              this.logger.error(this,"Login failed.");
              that.localStorageService.removeItem('user');
              that.router.navigate(['login']);
            });
          }
          //Create Application session by checking if the user already been created (or) create the user.

        } else {
          that.logger.info("External App User didn't login, lets take user to the login screen");
        }
    });
  }

  postLoginActivity(user: User, fedUser: SocialUser):void {
    this.localStorageService.setItem('user', JSON.stringify(user));
    if(fedUser != null && fedUser.authToken && fedUser.authToken != null) {
      if(fedUser.provider && fedUser.provider == "FACEBOOK") {
        this.localStorageService.setItem('fbAuthToken', JSON.stringify(fedUser.authToken));
      }
    }
    this.router.navigate(['postlogin']);
    this.idleService.startIdleService();
  }
}
