import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {

	private houses: any = [];

	constructor(private houseService: HouseService,
			private logger: LoggingService) {

	}

	ngOnInit() {
		let that = this;
		this.houseService.list().subscribe(res => {
			that.houses = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
