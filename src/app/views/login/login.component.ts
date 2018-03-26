import {Component, EventEmitter, OnInit, Output, ViewChild, HostListener,Input} from '@angular/core';
import {NgForm} from '@angular/forms';

import { Usersession } from '../../models/usersession';

@Component({
  selector: 'h4r-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class': 'col-4'}
})

export class LoginComponent implements OnInit {
    constructor() { }
    //@Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
    public usersession: Usersession = new Usersession("", "");
    
    ngOnInit() {
    }
    
    @Output() onLoginClick = new EventEmitter<Usersession>();  
    @ViewChild('form') public form: NgForm;
    
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === "Enter" && this.usersession.login.length > 0) { // && this.form.valid
            //this.login({login:this.loginId.text, password:this.password.text});
            this.login(this.usersession);
        }
    }

    login(usersession: Usersession) {
        this.onLoginClick.emit(usersession);
        usersession.login = '';
        usersession.password = '';
    }
}

