import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AppSettings } from '../../models/AppSettings';
import { User } from '../../models/User';
import { Community } from '../../models/Community';
import { Notification } from '../../models/Notification';
import { UtilityService } from '../../services/UtilityService';
import { Pagination } from '../../models/Pagination';
import { Router } from '@angular/router';
import { UserHouseContractSharedKey } from '../../models/UserHouseContractSharedKey';
import { HouseContractsService } from '../../services/HouseContractsService';

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

  public inactiveRecords:boolean = false;
  public activeRecords:boolean = true; 
  public originalList:Array<any> = null;
  public pageSettings:Pagination = this.createPaginationObject(this.originalList);

  constructor(public loginService: LoginService) { 
    this.communities = loginService.getCommunities();
    this.currentUser = loginService.getCurrentUser();
  }

  ngOnInit() {
  }
  
  isUserLogin() {
    let user = this.loginService.getCurrentUser();
    if(user != null) {
      this.userPic = UtilityService.prepareS3BucketUrl(user.avatar);//AppSettings.IMAGE_BASE_URL + user.avatar;//user.avatar;
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

  public filterActiveRecords(): void {
    this.pageSettings = this.createPaginationObject(this.originalList);
  }

  public createPaginationObject(list:Array<any>): Pagination {
    this.originalList = list;
    return new Pagination(list, this.activeRecords, this.inactiveRecords);
  }

  launchNewContractWithSharedKey(router:Router, houseContractsService: HouseContractsService, 
                    sharedKey: UserHouseContractSharedKey):boolean {
    houseContractsService.setSharedKey(sharedKey);
  	router.navigate(['../house_contract/0']);
		return false;
  }

  public isUserEntitled(roleConst:string):boolean {
    return (this.currentUser.entitlement & AppSettings.ROLES[roleConst].value) != 0;
  }
  
}
