import { Component, OnInit, Input } from '@angular/core';
import { HouseContractsService } from '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {H4rbaseComponent} from '../h4rbase/h4rbase.component';
import { House } from '../../models/House';
import { HouseContractsComponent } from './house-contracts.component';

@Component({
  selector: 'h4r-tab-house-contracts',
  templateUrl: './house-contracts.component.html',
  styleUrls: ['./house-contracts.component.scss']
})
export class TabHouseContractsComponent extends HouseContractsComponent {

	@Input() house:House;
	constructor(public houseContractsService: HouseContractsService,
			public logger: LoggingService,
			public loginService: LoginService) {
				super(houseContractsService,logger, loginService);
	}

	ngOnInit() {
		
	}
	
	ngOnChanges() {
		this.refreshHouseContracts();
	}

	refreshHouseContracts() {
        this.logger.log(this,"Fetched all the houseContracts for a given house");
		let that = this;
		if(this.house != null && this.house.id != 0) {
			this.houseContractsService.listByHouse(this.house.id).subscribe(resp => {
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
	}
}
