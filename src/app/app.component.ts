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
  isUserlogin = false;
  //public usersession: Observable<Usersession>;
  public usersession: Usersession;
  
  constructor(private loginService: LoginService, protected localStorage: AsyncLocalStorage) {
    console.log("AppComponent C'tor");
    loginService.get().subscribe(res => {
        console.log("Looks like usersession is still alive, userid=" + res.fname);
        this.localStorage.setItem('user', res).subscribe(() => {
            console.log("Stored user session in localStorage");
            this.isUserlogin = true;
        });
        //Do not show login dialog
    },
    err => {
            console.log('Error occurred while retrieving user session', err);
            localStorage.setItem('user', null).subscribe(() => {
                
            });
    });
  }
  
  
  /*
    eventData is a json payload to login 
  */
  validateLogin(usersession: Usersession) {
    console.log("Login with userid " + usersession.login);
    this.loginService.login(usersession).subscribe(res => {
        console.log("Login successful");
    }
    ,err => {
        console.log("Login failed.");  
    });//(new Usersession(eventData.login, eventData.password));
  }
}
