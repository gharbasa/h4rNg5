import {Component, EventEmitter, OnInit, Output, ViewChild, HostListener} from '@angular/core';
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
    //(new Usersession(eventData.login, eventData.password))
    public usersession: Usersession = new Usersession("a", "a");
    
    //public loginId: any = {text: 'l'};
    //public password: any = {text: 'p'};
    
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
        //this.loginId.text = '';
        //this.password.text = '';
    }
}

