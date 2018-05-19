import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import {Pagination} from  '../../models/Pagination';

@Component({
  selector: 'h4r-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent extends H4rbaseComponent {

	public pageSettings:Pagination = new Pagination(null);
	public errorMessage:string = "";
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
		this.houseService.setOperation("");
		let that = this;
		this.houseService.list(this.community_id).subscribe(res => {
			that.pageSettings = new Pagination(res); //We have to build a new instance of pagination, existing instance will not refresh the view.
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			that.pageSettings = new Pagination(null);
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

	updateVerifyFlag(house:any) {
		let that = this;
		this.logger.log(this,"updateVerifyFlag");
		that.errorMessage = "";
		this.houseService.updateVerifyFlag(house).subscribe(res => {
			that.logger.log(that,"House has been successfully updated");
		}, err => {
			that.logger.error(that,"Error in updating the verify flag of the house, err=" + JSON.stringify(err));
			that.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem updating the house";
		});
	}

}
