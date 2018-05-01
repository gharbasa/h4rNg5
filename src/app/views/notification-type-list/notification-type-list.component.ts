import { Component, OnInit } from '@angular/core';
import { NotificationTypeService } from '../../services/NotificationTypeService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { NotificationType } from '../../models/NotificationType';

@Component({
  selector: 'h4r-notification-type-list',
  templateUrl: './notification-type-list.component.html',
  styleUrls: ['./notification-type-list.component.scss']
})

export class NotificationTypeListComponent implements OnInit {

	private notificationTypes: Array<NotificationType> = [];

	constructor(private notificationTypeService: NotificationTypeService
			, private logger: LoggingService
			, private loginService:LoginService) {
		let that = this;
		
		this.notificationTypes = this.loginService.getNotificationTypes();
	}
	
	ngOnInit() {
	}
}
