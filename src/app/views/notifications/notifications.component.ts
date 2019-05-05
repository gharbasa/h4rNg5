import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Notification } from '../../models/Notification';
import {Pagination} from  '../../models/Pagination';
import { NotificationService } from '../../services/NotificationService';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

	public pageSettings:Pagination = new Pagination(null, true, true, "", []);
	
	constructor(private loginService: LoginService
  			,private notificationService: NotificationService
  			,private logger: LoggingService) { 
  		
  	}
	
  	ngOnInit() {
		this.refreshNotifications();
  	}
  	
  	ngOnChanges() {
		
  	}
  	
  	refreshNotifications():void {
		let that = this;
		this.notificationService.list(this.loginService.getCurrentUser().id).subscribe(res => {
			that.logger.log(that,"Fetched notifications of length.." + res.length);
			that.pageSettings = new Pagination(res, true, true, "", []); //We have to build a new instance of pagination, existing instance will not refresh the view.
			that.loginService.setNotifications(res);
		},
		err =>{
			this.logger.error(this,"error in fetching notifications");
		});
  	}
  	
  	deleteNotification(notification: Notification) {
		this.logger.log(this,"Ok, received the event to delete the notification id=" + notification.id);
		let that = this;
		this.notificationService.remove(notification.id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the notification");
			that.refreshNotifications();
		}, err => {
			that.logger.error(this,"Error in deleting the notification");
		});
	}
}
