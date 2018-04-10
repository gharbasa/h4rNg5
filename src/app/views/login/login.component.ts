import {Component, EventEmitter, OnInit, Output, ViewChild, HostListener,Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Usersession } from '../../models/usersession';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';


@Component({
  selector: 'h4r-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'col-4'}
})

export class LoginComponent implements OnInit {
    constructor(private loginService: LoginService 
    		,private localStorageService: LocalStorageService
    		,private router: Router
    		,private logger: LoggingService) { 
        
    }
    //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
    public usersession: Usersession = new Usersession("", "");
    
    ngOnInit() {
    }
    
    @Output() onLoginClick = new EventEmitter<Usersession>();  
    @ViewChild('form') public form: NgForm;
    
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === "Enter" && this.usersession.login.length > 0) {
            this.login();
        }
    }

    login() {
        //this.onLoginClick.emit(user session);
    	this.logger.log(this,"Login with userid " + this.usersession.login);
        let that = this;
        this.loginService.login(this.usersession).subscribe(res => {
            //this.logger.log(this,"Login successful " + res.fname);
            that.updateUserInLocalStorage(res);
            //navigate user to the post login 
            this.router.navigate(['postlogin']);
        }
        ,err => {
        	this.logger.error(this,"Login failed.");
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
}

