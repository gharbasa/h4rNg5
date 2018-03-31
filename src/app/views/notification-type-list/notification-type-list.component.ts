import { Component, OnInit } from '@angular/core';
import { NotificationTypeService } from '../../services/NotificationTypeService';

@Component({
  selector: 'h4r-notification-type-list',
  templateUrl: './notification-type-list.component.html',
  styleUrls: ['./notification-type-list.component.scss']
})

export class NotificationTypeListComponent implements OnInit {

	private notificationTypes: any;

	constructor(private notificationTypeService: NotificationTypeService) {
		let that = this;
		
		this.notificationTypeService.list().subscribe(res => {
			that.notificationTypes = res;
			//console.log("notificationTypes =" + JSON.stringify(res));
		}, err=> {
			console.log("notificationTypes err=" + JSON.stringify(err));
		});
	}
	
	ngOnInit() {
	}
}
