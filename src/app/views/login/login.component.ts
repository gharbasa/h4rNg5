 import {Component, EventEmitter, OnInit, Output, ViewChild, HostListener,Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Usersession } from '../../models/usersession';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { IdleService } from '../../services/IdleService';

import { FacebookLoginProvider, AuthService, SocialUser } from "angularx-social-login";
 

@Component({
  selector: 'h4r-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'col-4'}
})

export class LoginComponent implements OnInit {

    public errorMessage: string = "";
    constructor(private loginService: LoginService 
    		,private localStorageService: LocalStorageService
    		,private router: Router
    		,private logger: LoggingService
            ,private idleService: IdleService
            ,private authService: AuthService) { 
        
    }
    //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
    public usersession: Usersession = new Usersession("", "");
    
    ngOnInit() {
        this.idleService.stop();
    }
    
    @Output() onLoginClick = new EventEmitter<Usersession>();  
    @ViewChild('form') public form: NgForm;
    
    /*
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === "Enter" && this.usersession.login.length > 0) {
            this.login();
        }
    }*/

    login() {
        //this.onLoginClick.emit(user session);
    	this.logger.log(this,"Login with userid " + this.usersession.login);
        let that = this;
        this.errorMessage = "";
        this.loginService.login(this.usersession).subscribe(res => {
            //this.logger.log(this,"Login successful " + res.fname);
            that.updateUserInLocalStorage(res);
            //navigate user to the post login 
            this.router.navigate(['postlogin']);
            this.idleService.startIdleService();
        }
        ,err => {
            this.logger.error(this,"Login failed.");
            this.errorMessage = "Login failed.";
            that.removeUserFromLocalStorage();
        });
        this.usersession.login = '';
        this.usersession.password = '';
    }
    
    updateUserInLocalStorage(res) {
    	this.logger.log(this,"Updating user in localStorage ");
        this.localStorageService.setItem('user', JSON.stringify(res));
    }
    
    removeUserFromLocalStorage() {
    	this.logger.log(this,"Removing user from localStorage");
        this.localStorageService.removeItem('user');
    }
    
    newUserClicked() {
    	this.router.navigate(['newUser']);
    	return false;
    }
    
    forgotPassword(): boolean {
    	this.logger.info("user clicked forgot password");
    	this.router.navigate(['reset-password']);
    	return false;
    }

    signInWithFB():boolean {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        return false;
    }
}

