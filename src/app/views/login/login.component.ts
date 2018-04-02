import {Component, EventEmitter, OnInit, Output, ViewChild, HostListener,Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Usersession } from '../../models/usersession';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'h4r-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'col-4'}
})

export class LoginComponent implements OnInit {
    constructor(private loginService: LoginService 
    		,private localStorageService: LocalStorageService
    		,private router: Router) { 
        
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
            this.login(this.usersession);
        }
    }

    login(usersession: Usersession) {
        //this.onLoginClick.emit(usersession);
        console.log("Login with userid " + usersession.login);
        let that = this;
        this.loginService.login(usersession).subscribe(res => {
            //console.log("Login successful " + res.fname);
            that.updateUserInLocalStorage(res);
            this.loginService.postLoginActivity();
            //navigate user to the postlogin 
            this.router.navigate(['postlogin']);
        }
        ,err => {
            console.log("Login failed.");
            that.removeUserFromLocalStorage();
        });
        usersession.login = '';
        usersession.password = '';
    }
    
    updateUserInLocalStorage(res) {
        console.log("Updating user in localStorage ");
        this.localStorageService.setItem('user', JSON.stringify(res));
    }
    
    removeUserFromLocalStorage() {
        console.log("Removing user from localStorage");
        this.localStorageService.removeItem('user');
    }
    
    newUserClicked() {
    	this.router.navigate(['newUser']);
    	return false;
    }
}

