import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { LoginService } from './services/login.service';
import { Usersession } from './models/Usersession';

import { AppSettings } from './models/AppSettings';
import { AppSettingsService } from './services/AppSettingsService';
import { LocalStorageService } from './services/LocalStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'h4r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Gharbasa-o';
  userLoggedin:boolean = false;
  //public usersession: Observable<Usersession>;
  //public usersession: Usersession = new Usersession("","");
  
  constructor(private loginService: LoginService
		  		, private localStorageService: LocalStorageService
		  		, private router: Router) {
    console.log("AppComponent C'tor");
    let that = this;
    loginService.get().subscribe(res => {
        console.log("Looks like usersession is still alive");
        that.localStorageService.setItem('user', JSON.stringify(res));
        this.router.navigate(['postlogin']);
        //Do not show login dialog
    },
    err => {
            console.log('Error occurred while retrieving user session, taking user to the login screen', err);
            that.localStorageService.removeItem('user');
            this.router.navigate(['login']);
    });
  }
}
