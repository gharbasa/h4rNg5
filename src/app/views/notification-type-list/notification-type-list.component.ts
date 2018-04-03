import { Component, OnInit } from '@angular/core';
import { NotificationTypeService } from '../../services/NotificationTypeService';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-notification-type-list',
  templateUrl: './notification-type-list.component.html',
  styleUrls: ['./notification-type-list.component.scss']
})

export class NotificationTypeListComponent implements OnInit {

	private notificationTypes: any;

	constructor(private notificationTypeService: NotificationTypeService
			, private logger: LoggingService) {
		let that = this;
		
		this.notificationTypeService.list().subscribe(res => {
			that.notificationTypes = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"notificationTypes err=" + JSON.stringify(err));
		});
	}
	
	ngOnInit() {
	}
}
