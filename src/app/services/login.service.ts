import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommunityService } from './CommunityService';
import { LocalStorageService } from './LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { NotificationService } from './NotificationService';
import { NotificationTypeService } from './NotificationTypeService';
import { UserService } from './UserService';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class LoginService {

	private notifications:any = [];
	private notificationTypes:any = [];
	private users:any = [];
	private communities:any = [];
	constructor(private http: HttpClient, 
				private communityService:CommunityService,
				private localStorageService: LocalStorageService,
				private logger: LoggingService,
				private notificationService: NotificationService,
				private notificationTypeService: NotificationTypeService,
				private userService: UserService) { 
		
	}
	
	private basePath = '/api/1/usersession';
	
	get() {
		return this.http.get(this.basePath);
	}

	login(payload) {
		return this.http.post(this.basePath, payload);
	}

	remove(userId) {
		return this.http.delete(this.basePath + "/" + userId);
	}

	update(payload) {
		return this.http.patch(this.basePath + '/${payload.id}.json', payload);
	}
	
	postLoginActivity() {
		let that = this;
		this.communityService.list().subscribe(res => {
			this.logger.log(this,"Fetched communities");
			//this.localStorageService.setItem('communities', JSON.stringify(res));
			that.communities = res;
		},
		err =>{
			this.logger.error(this,"error in fetching communities");
		});
		
		this.refreshNotifications();
		
		this.refreshUsersList();
		
		this.notificationTypeService.list().subscribe(res => {
			that.notificationTypes = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"notificationTypes err=" + JSON.stringify(err));
		});
		
	}
	
	isUserLogin() {
	    let user = this.localStorageService.getItem('user');
	    let result = ((user != undefined) && (user != null));
	    return result;
	}
	
	getCurrentUser() {
		let user = null;
		if(this.isUserLogin() == true) {
			user = this.localStorageService.getItem('user');
		}
		return JSON.parse(user);
	}
	
	refreshNotifications() {
		let that = this;
		let user = this.getCurrentUser();
		this.notificationService.list(user.id).subscribe(res => {
			this.logger.log(this,"Fetched notifications");
			that.notifications = res;
		},
		err =>{
			this.logger.error(this,"error in fetching notifications");
		});
	}
	
	/**Fetch the list of users
	 * 
	 */
	refreshUsersList() {
		let that = this;
		this.userService.list().subscribe(res => {
			this.logger.log(this,"Fetched users");
			that.users = res;
		},
		err =>{
			this.logger.error(this,"error in fetching notifications");
		});
	}
	
	isAdminUser() {
		  let user = this.getCurrentUser();
		  return (user != null && user.admin===true);
	 }
	
	getNotifications() {
		return this.notifications;
	}
	
	getNotificationTypes() {
		return this.notificationTypes;
	}
	
	getCommunities() {
		return this.communities;
	}
	
	getUsers() {
		let that = this;
		this.users.forEach(function (user) {
			user.avatar = AppSettings.H4R_BACKEND_URL + user.avatar;
			user.fullName = user.lname + ", " + user.fname;
			if(user.sex==1)
				user.sexStr = "Male";
			else if(user.sex==2)
				user.sexStr = "Female";
			else
				user.sexStr = "Other";
			user.roleStr = that.populateUserRoleString(user);
			user.promote2Admin = user.admin;
		});
		
		return this.users;
	}
	
	getUserName(userId:number) {
		var name = "";
		this.users.forEach(function (user) {
			if(user.id == userId) name = user.fullName;
		});
		return name;
	}
	
	populateUserRoleString(user:any) {
		let rolesArray:any = [];
		if(user.admin) {
			rolesArray.push(JSON.stringify(AppSettings.ROLES["ADMIN"].label));
		}
		/**
		if(user.guest)
			rolesArray.push(AppSettings.ROLES["GUEST"].label));
		*/
		let str:string = "";
		if(rolesArray.length > 0) {
			str = rolesArray[0];
			for(var i=1; i<rolesArray.length; i++) {
				str += ", " + rolesArray[i];
			}
		}
		return str;
	}
}