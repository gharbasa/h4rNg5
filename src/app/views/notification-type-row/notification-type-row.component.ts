import { Component, OnInit, Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';

/**
 * This is not used at this moment
 */
@Component({
  selector: 'h4r-notification-type-row',
  templateUrl: './notification-type-row.component.html',
  styleUrls: ['./notification-type-row.component.scss']
})
export class NotificationTypeRowComponent implements OnInit {

	@Input() notificationType:any;
	constructor(private logger: LoggingService) { }

	ngOnInit() {
	}

}
