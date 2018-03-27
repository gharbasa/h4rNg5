import { Component, OnInit, Input, Output,EventEmitter, HostListener } from '@angular/core';

import { LocalStorageService } from '../../services/LocalStorageService';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'h4r-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(protected localStorageService: LocalStorageService
		  ,private router: Router
		  ,private loginService: LoginService) { }
  @Input() isUserlogin: boolean; //input is supplied from its parent component(refer to app.component.html)
  @Output() onLogoutClick = new EventEmitter<string>();
  
  ngOnInit() {
  }
  
  logoutClicked() {
	  let that = this;
	  
	  let userJSON = this.localStorageService.getItem('user');
	  let user = JSON.parse(userJSON);
	  let userId = user.id;
	  console.log("User wants to logout userId=" + userId);    
	  that.loginService.remove(userId).subscribe(res => {
		  console.log("Logout successful");
		  that.localStorageService.removeItem('user');
	  }
	  ,err => {
		  console.log("Somehow Logout failed.");
		  that.localStorageService.removeItem('user');
	  });
	  return false;
  }
  
  isUserLogin() {
	    let user = this.localStorageService.getItem('user');
	    let result = ((user != undefined) && (user != null));
	    return result;
  }
  
}
