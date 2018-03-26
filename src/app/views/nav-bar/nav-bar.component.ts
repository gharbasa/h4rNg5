import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';

import { LoginService } from './services/login.service';
import { Usersession } from './models/Usersession';

@Component({
  selector: 'h4r-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  @Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
  @Output() onLogoutClick = new EventEmitter<string>();
  
  ngOnInit() {
  }
  
  logoutClicked() {
	  console.log("User wants to logout");
	  this.onLogoutClick.emit("userId");
  }
}
