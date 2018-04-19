import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'h4r-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {

	private houses: any = [];
	private communities:any = null;
	private community_id:number = null;
	constructor(private houseService: HouseService,
			private logger: LoggingService, 	
			private loginService: LoginService) {

	}

	ngOnInit() {
		this.fetchHouses();
		this.communities = this.loginService.getCommunities();
	}

	fetchHouses() {
		let that = this;
		this.houseService.list(this.community_id).subscribe(res => {
			that.houses = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
