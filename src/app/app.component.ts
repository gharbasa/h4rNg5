import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { LoginService } from './services/login.service';
import { Usersession } from './models/Usersession';

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
  
  constructor(private loginService: LoginService, protected localStorage: AsyncLocalStorage) {
    console.log("AppComponent C'tor");
    let that = this;
    loginService.get().subscribe(res => {
        //console.log("Looks like usersession is still alive, userid=" + res.fname);
        that.localStorage.setItem('user', res).subscribe(() => {
            console.log("Stored user session in localStorage");
            that.userLoggedin = true;
        });
        //Do not show login dialog
    },
    err => {
            console.log('Error occurred while retrieving user session', err);
            that.localStorage.removeItem('user').subscribe(() => {
                that.userLoggedin = false;
            });
    });
  }
  
  
  /*
    eventData is a json payload to login 
  */
  validateLogin(usersession: Usersession) {
    console.log("Login with userid " + usersession.login);
    let that = this;
    this.loginService.login(usersession).subscribe(res => {
        console.log("Login successful");
        that.localStorage.setItem('user', res).subscribe(() => {
            console.log("Stored user session in localStorage");
            that.userLoggedin = true;
        });
    }
    ,err => {
        console.log("Login failed.");
        that.userLoggedin = false;  
        that.localStorage.removeItem('user').subscribe(() => {
                that.userLoggedin = false;
            });
    });
  }
  
  logout(eventPayload:any) {
    let that = this;
    let userId = "";
    this.localStorage.getItem('user').subscribe((user) => {
        userId = user.id;
        console.log("1.Logout user session -" + userId);    
        that.loginService.remove(userId).subscribe(res => {
            console.log("Logout successful");    
        }
        ,err => {
            console.log("Somehow Logout failed.");
        });
        that.localStorage.removeItem('user').subscribe(() => {
            console.log("Removed user from the session");
            that.userLoggedin = false;
        });
    });
  }
}
