import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Notification } from '../../models/Notification';
import { NotificationService } from '../../services/NotificationService';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
	
	private notifications:any = []; 
  	constructor(private loginService: LoginService
  			,private notificationService: NotificationService
  			,private logger: LoggingService) { 
  		
  	}

  	ngOnInit() {
  		this.notifications = this.loginService.getNotifications();
  	}
  	
  	ngOnChanges() {
  		//this.notifications = this.loginService.getNotifications();
  	}
  	
  	refreshNotifications() {
  		this.loginService.refreshNotifications();
  		this.notifications = this.loginService.getNotifications();
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
