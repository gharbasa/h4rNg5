import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AppSettings } from '../../models/AppSettings';
import { User } from '../../models/User';
import { Community } from '../../models/Community';
import { Notification } from '../../models/Notification';

@Component({
  selector: 'h4r-h4rbase',
  templateUrl: './h4rbase.component.html' //This shouldn't be empty.
})
export class H4rbaseComponent implements OnInit {

  public userPic:string = ""; 
	public userName:string = "";
  public notifications:Array<Notification> = [];
  
  public community_id:number = null;
  public communities:Array<Community> = [];
  public currentUser:User = null;
  public TicketStatuses:Array<any> = [
    {id:0, name: "All"},
    {id:1, name: "Created"},
    {id:2, name: "Open"},
    {id:3, name: "Waiting"},
    {id:4, name: "Pending"},
    {id:5, name: "Done"}
  ];

  constructor(public loginService: LoginService) { 
    this.communities = loginService.getCommunities();
    this.currentUser = loginService.getCurrentUser();
  }

  ngOnInit() {
  }
  
  isUserLogin() {
    let user = this.loginService.getCurrentUser();
    if(user != null) {
      this.userPic = user.avatar;//AppSettings.H4R_BACKEND_URL + user.avatar;
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
