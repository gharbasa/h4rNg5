import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommunityService } from './CommunityService';
import { LocalStorageService } from './LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { NotificationService } from './NotificationService';
import { NotificationTypeService } from './NotificationTypeService';

@Injectable()
export class LoginService {

	private notifications:any = [];
	private notificationTypes:any = [];
	private communities:any = [];
	constructor(private http: HttpClient, 
				private communityService:CommunityService,
				private localStorageService: LocalStorageService,
				private logger: LoggingService,
				private notificationService: NotificationService,
				private notificationTypeService: NotificationTypeService) { 
		
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
	
}