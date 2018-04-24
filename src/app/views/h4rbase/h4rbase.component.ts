import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-h4rbase',
  templateUrl: './h4rbase.component.html' //This shouldn't be empty.
})
export class H4rbaseComponent implements OnInit {

  public userPic:string = ""; 
	public userName:string = "";
  public notifications:any = [];
  
  public community_id:number = null;
  public communities:any = null;
  public currentUser:any = null;
  constructor(public loginService: LoginService) { 
    this.communities = loginService.getCommunities();
    this.currentUser = loginService.getCurrentUser();
  }

  ngOnInit() {
  }

  isUserLogin() {
    let user = this.loginService.getCurrentUser();
    if(user != null) {
      this.userPic = AppSettings.H4R_BACKEND_URL + user.avatar;
      this.userName = user.fullName;
      this.notifications = this.loginService.getNotifications();
    } else {
      this.resetLocalBuffer();
      return false;
    }
    return true;
}

  isAdminUser() {
    return this.loginService.isAdminUser();
  }

  resetLocalBuffer(): void {
    this.userPic = "";
      this.userName = "";
      this.notifications = [];
    }

}
