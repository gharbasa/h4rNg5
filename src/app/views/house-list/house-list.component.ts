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
	private errorMessage:string = "";
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

	updateOpenHouseFlag(house:any) {
		let that = this;
		this.logger.log(this,"updateOpenHouseFlag");
		that.errorMessage = "";
		this.houseService.updateOpenHouseFlag(house).subscribe(res => {
			that.logger.log(that,"House has been successfully updated");
		}, err => {
			that.logger.error(that,"Error in updating the is_open flag of the house, err=" + JSON.stringify(err));
			that.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem updating the house";
		});
	}

	updateActiveFlag(house:any) {
		let that = this;
		this.logger.log(this,"makeHouseActive");
		that.errorMessage = "";
		this.houseService.updateActiveFlag(house).subscribe(res => {
			that.logger.log(that,"House has been successfully updated");
		}, err => {
			that.logger.error(that,"Error in updating the active flag of the house, err=" + JSON.stringify(err));
			that.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem updating the house";
		});
	}

}
