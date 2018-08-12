import { Component, OnInit } from '@angular/core';
import { HouseContractsService } from '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {H4rbaseComponent} from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-house-contracts',
  templateUrl: './house-contracts.component.html',
  styleUrls: ['./house-contracts.component.scss']
})
export class HouseContractsComponent extends H4rbaseComponent {

	public errorMessage:string = "";
	constructor(public houseContractsService: HouseContractsService,
		public logger: LoggingService,
			public loginService: LoginService) {
				super(loginService);
	}

	ngOnInit() {
		this.refreshHouseContracts();
	}

	refreshHouseContracts() {
		let that = this;
		this.houseContractsService.list(this.community_id).subscribe(resp => {
			this.logger.log(this,"Fetched all the houseContracts");
			for(var i in resp) {
				let contract:HouseContract = resp[i];
				HouseContract.determineContractTypeStr(contract);
				HouseContract.determineRoles(contract);
		  		if(contract.roles != "") {
		  			let roleStr = contract.roles;
		  			contract.roles = roleStr.substring(0, roleStr.length - 2);
		  		}
			  }
			  that.pageSettings = this.createPaginationObject(resp);

		}, err=> {
			this.logger.error(this,"error fetching houseContracts, err=" + JSON.stringify(err));
			that.pageSettings = this.createPaginationObject(null);
		});
	}

	activeFlagChanged(houseContract: HouseContract) {
		let that = this;
		this.errorMessage =  "";
		this.logger.info(this,"active flag changed to " + houseContract.active);
		if(houseContract.active == true) {
			this.houseContractsService.activate(houseContract).subscribe(resp => {
				this.logger.info(this," Successfully activated the contract.");	
				that.refreshHouseContracts();
			},err => {
				that.errorMessage =  "Error in activating the contract.";
				this.logger.error(that, that.errorMessage);	

			})
		}

		if(houseContract.active == false) {
			this.houseContractsService.deactivate(houseContract).subscribe(resp => {
				this.logger.info(this," Successfully deactivated the contract.");	
				that.refreshHouseContracts();
			},err => {
				that.errorMessage =  "Error in deactivating the contract.";
				this.logger.error(that,that.errorMessage);	
			})
		}
	}

}
