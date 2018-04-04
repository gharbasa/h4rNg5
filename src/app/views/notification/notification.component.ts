import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { Notification } from '../../models/Notification';

@Component({
  selector: 'h4r-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

	@Input() notification:Notification;
	@Output() onDeleteNotificationClick = new EventEmitter<Notification>();
	
	constructor(private localStorageService:LocalStorageService
			, private logger: LoggingService
			, private loginService: LoginService) { 
		this.logger.info(this, "notification.subject");
	}

	ngOnInit() {
		this.massageNotification();
	}
	
	ngOnChanges() {
		this.massageNotification();
	}
	
	massageNotification() {
		if(this.notification != null) {
			let noticeType = this.findNoticeType(this.notification.notification_type_id);
			this.notification.content = noticeType.content;
			this.notification.subject = noticeType.subject;
		} else {
			this.logger.info(this, "notification is null");
		}
	}
	
	findNoticeType(notice_type_id) {
		const noticeTypes = this.loginService.getNotificationTypes(); //array of notice_types
		var noticeType = null;
		for(var i in noticeTypes) {
			var notification_type = noticeTypes[i];
			if(notification_type.id == notice_type_id) {
				noticeType = notification_type;
			}
		}
		return noticeType;
	}
	
	deleteNotification() {
		this.logger.log(this, "user wants to delete the notification=" + this.notification.id)
		this.onDeleteNotificationClick.emit(this.notification);
		return false;
	}

}
