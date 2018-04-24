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

	private houseContracts: any = [];
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
		that.houseContracts.length = 0;
		this.houseContractsService.list(this.community_id).subscribe(resp => {
			this.logger.log(this,"Fetched all the houseContracts");
			for(var i in resp) {
			  	let contract:any = resp[i];
			  	contract.roles = "";
	  			if(contract.tenant == true) {
					contract.roles = contract.roles + "tenant, ";
		  		}
		  		if(contract.land_lord == true) {
					contract.roles = contract.roles + "land_lord, ";
		  		}
		  		if(contract.accountant == true) {
					contract.roles = contract.roles + "accountant, ";
		  		}
		  		if(contract.property_mgmt_mgr == true) {
					contract.roles = contract.roles + "property_mgmt_mgr, ";
		  		}
		  		if(contract.property_mgmt_emp == true) {
					contract.roles = contract.roles + "property_mgmt_emp, ";
		  		}
		  		if(contract.agency_collection_emp == true) {
					contract.roles = contract.roles + "agency_collection_emp, ";
		  		}
		  		if(contract.agency_collection_mgr == true) {
					contract.roles = contract.roles + "agency_collection_mgr, ";
		  		}
		  		
		  		if(contract.roles != "") {
		  			let roleStr = contract.roles;
		  			contract.roles = roleStr.substring(0, roleStr.length - 2);
		  		}
		  		that.houseContracts.push(contract);
		  	}

		}, err=> {
			this.logger.error(this,"error fetching houseContracts, err=" + JSON.stringify(err));
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
