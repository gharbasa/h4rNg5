import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent extends H4rbaseComponent {

	private houses: any = [];
	constructor(private houseService: HouseService,
			private logger: LoggingService, 	
			public loginService: LoginService) {
				super(loginService);
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
