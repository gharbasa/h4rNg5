import { Component, OnInit } from '@angular/core';
import { HouseContractsService } from '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {H4rbaseComponent} from '../h4rbase/h4rbase.component';
import {Pagination} from  '../../models/Pagination';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-house-contracts',
  templateUrl: './house-contracts.component.html',
  styleUrls: ['./house-contracts.component.scss']
})
export class HouseContractsComponent extends H4rbaseComponent {

	private pageSettings:Pagination = new Pagination(null);
	private errorMessage:string = "";
	constructor(private houseContractsService: HouseContractsService,
			private logger: LoggingService,
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
			  	let contract:any = resp[i];
			  	contract.roles = "";
	  			if(contract.tenant == true) {
					contract.roles = contract.roles + AppSettings.ROLES["TENANT"].label + ", ";
		  		}
		  		if(contract.land_lord == true) {
					contract.roles = contract.roles + AppSettings.ROLES["LAND_LORD"].label + ", ";
		  		}
		  		if(contract.accountant == true) {
					contract.roles = contract.roles + AppSettings.ROLES["ACCOUNTANT"].label + ", ";
		  		}
		  		if(contract.property_mgmt_mgr == true) {
					contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_MGR"].label + ", ";
		  		}
		  		if(contract.property_mgmt_emp == true) {
					contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_EMP"].label + ", ";
		  		}
		  		if(contract.agency_collection_emp == true) {
					contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_EMP"].label + ", ";
		  		}
		  		if(contract.agency_collection_mgr == true) {
					contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_MGR"].label + ", ";
		  		}
		  		
		  		if(contract.roles != "") {
		  			let roleStr = contract.roles;
		  			contract.roles = roleStr.substring(0, roleStr.length - 2);
		  		}
			  }
			  that.pageSettings = new Pagination(resp); //We have to build a new instance of pagination, existing instance will not refresh the view.

		}, err=> {
			this.logger.error(this,"error fetching houseContracts, err=" + JSON.stringify(err));
			that.pageSettings = new Pagination(null);
		});
	}

	activeFlagChanged(houseContract: HouseContract) {
		let that = this;
		this.errorMessage =  "";
		this.logger.info(this,"active flag changed to " + houseContract.active);
		if(houseContract.active == true) {
			this.houseContractsService.activate(houseContract).subscribe(resp => {
				this.logger.info(this," Successfully activated the contract.");	
			},err => {
				that.errorMessage =  "Error in activating the contract.";
				this.logger.error(that, that.errorMessage);	

			})
		}

		if(houseContract.active == false) {
			this.houseContractsService.deactivate(houseContract).subscribe(resp => {
				this.logger.info(this," Successfully deactivated the contract.");	
			},err => {
				that.errorMessage =  "Error in deactivating the contract.";
				this.logger.error(that,that.errorMessage);	
			})
		}
	}

}
