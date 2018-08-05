import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {HouseContractsService} from  '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';
import { AppSettings } from '../../models/AppSettings';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import * as moment from 'moment'; 
import { UtilityService } from '../../services/UtilityService';
import { UserHouseContractSharedKey } from '../../models/UserHouseContractSharedKey';

@Component({
  selector: 'h4r-house-contract',
  templateUrl: './house-contract.component.html',
  styleUrls: ['./house-contract.component.scss']
})
export class HouseContractComponent implements OnInit {

 	public houseContract:HouseContract = new HouseContract();
	public errorMessage:string = "";
	public newContract:boolean = false;

	@ViewChild('contractStartDate')
	contractStartDate: DatePickerComponent;

	@ViewChild('contractEndDate')
	contractEndDate: DatePickerComponent;

 	constructor(private houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService
			, private logger: LoggingService
			, private loginService:LoginService
			, private houseContractsService:HouseContractsService) { }

 	ngOnInit() {
  		let that = this;
      that.newContract = true;
      that.houseContract.message = "";
      that.houseContract.errorMessage = "";
  	  this.route.params.subscribe(res => {
  			if(res.id > 0) {
  				that.newContract = false;
  				that.fetchExistingContract(res.id);
  			} else if(res.id == 0) { //New contract launched from user-house-links
				that.newContract = true;
				let key:UserHouseContractSharedKey = that.houseContractsService.getSharedKey(); //house_user_role
				that.logger.log(that,"User is launched from House User Links, lets get the key=" + JSON.stringify(key));
				that.houseContract.renew = (key.creationType == AppSettings.CONTRACT_CREATION_TYPES["RENEW"]
													|| key.creationType == AppSettings.CONTRACT_CREATION_TYPES["CLONE"]);
				const contract_id:number = key.id;
				const creationType:number = key.creationType;
				that.houseContract.user = key.user;
				that.houseContract.user_id = key.user.id;
				that.houseContract.house = key.house;
				that.houseContract.house_id = key.house.id;
				that.houseContract.user_house_link_id = key.user_house_link_id;
				that.houseContract.roles = AppSettings.ROLES[key.role].label;
				that.houseContract.role = AppSettings.ROLES[key.role].value;
				that.houseContract.contract_type = AppSettings.ROLES[key.role].contract_type;
				that.houseContract.active = true;
				that.houseContract.contract_start_date = UtilityService.getFormattedDate();
				that.houseContract.contract_end_date = UtilityService.getFormattedDate();
				that.houseContractsService.setSharedKey(null); //Do not refer to key variable after this statement.
				if(that.houseContract.renew == true) 
				{
					that.logger.log(this, "User wants to renew/clone an existing contractId=" + contract_id + ", lets fetch it first.");
					that.houseContractsService.get(contract_id).subscribe(res => {
						if(creationType == AppSettings.CONTRACT_CREATION_TYPES["RENEW"]) {
							that.houseContract.contract_start_date = res.contract_end_date;
							that.houseContract.contract_end_date = "";
						} else {
							that.houseContract.contract_start_date = res.contract_start_date;
							that.houseContract.contract_end_date = res.contract_end_date;
						}
						that.houseContract.annual_rent_amount = res.annual_rent_amount;
						that.houseContract.monthly_rent_amount = res.monthly_rent_amount;
						that.houseContract.active = true;
						that.houseContract.from_contract_id = contract_id; //lets see if server can take this.
					},err => {
						that.houseContract.errorMessage = "Problem fetching existing contract. please try again after sometime.";
						that.logger.error(this,that.houseContract.errorMessage);  
					});
				} else {
					//Do nothing
				}

        } else {
  				that.logger.log(that,"User wants to create a new house contract from no where.");
  				
  			}
  		});
  	}

  fetchExistingContract(id:number) {
  		let that = this;
  		this.logger.log(this,"User wants to edit a house contract, id=" + id);
	  	this.houseContractsService.get(id).subscribe(res => {
  			that.houseContract = res;
  			that.houseContract.message = "";
	  		that.houseContract.errorMessage = "";
			HouseContract.determineRoles(that.houseContract);
			HouseContract.determineContractTypeStr(that.houseContract);

	  		if(that.houseContract.roles != "") {
	  			let roleStr = that.houseContract.roles;
	  			that.houseContract.roles = roleStr.substring(0, roleStr.length - 2);
	  		}

  		},
  		err => {
  			that.houseContract.message = "";
	  		that.houseContract.errorMessage = "Problem retrieving house contract.";
  		});
  	}

  	saveRecord() {
		let that = this;
		that.houseContractsService.setSharedKey(null);
  		if(this.newContract == false) {
  			this.logger.log(this,"User wants to edit/save a house contract, id=" + that.houseContract.id);
    		this.houseContractsService.update(that.houseContract).subscribe(res => {
    			this.logger.log(this,"Sucessfully updated house contract, id=" + that.houseContract.id);
    			this.router.navigate(['postupdate']);
    		},
    		err => {
    			this.logger.error(this,"Error in updating house contract, id=" + that.houseContract.id);
    			that.houseContract.errorMessage = "Problem saving the contract.";
    		});
  		} else {
  			this.logger.log(this,"User wants to create/save a house contract");
  			this.houseContractsService.create(that.houseContract).subscribe(res => {
  				this.logger.log(this,"Sucessfully created house contract");
  				this.router.navigate(['postupdate']);
  			},
  			err => {
  				this.logger.error(this,"Error in updating house contract, id=" + that.houseContract.id);
  				that.houseContract.errorMessage = "Problem saving the contract.";
  			});
  		}
	}
	
	startDateChanged(elementValue:string) {
		this.logger.info(this,"Ok, start date changed to=" + this.contractStartDate.getValue());
		this.houseContract.contract_start_date = elementValue;//this.paymentDate.getValue();
	}

	endDateChanged(elementValue:string) {
		this.logger.info(this,"Ok, end date changed to=" + this.contractEndDate.getValue());
		this.houseContract.contract_end_date = elementValue;//this.paymentDate.getValue();
	}

	getDuration() {
		let startDate:any = moment(this.houseContract.contract_start_date, 'DD-MM-YYYY');
		let endDate:any = moment(this.houseContract.contract_end_date, 'DD-MM-YYYY');
		var months:number = Math.round(moment.duration(endDate.diff(startDate)).asMonths());
		if(months) {
			if(months > 0)
				return months + " months";
			else {
				let days:number = Math.round(moment.duration(endDate.diff(startDate)).asDays());
				return days + " days";
			}
		} else {
			return "0 days";
		}

	}

	changeContractType(type) {
		this.houseContract.contract_type  = type;
	}

	oneTimeContractSettingChanged():void {
		if(this.houseContract.onetime_contract === true) {
			this.houseContract.monthly_rent_amount = this.houseContract.annual_rent_amount
		}
	}

	prepareSharedKey():UserHouseContractSharedKey {
		let sharedKey:UserHouseContractSharedKey = new UserHouseContractSharedKey();
		sharedKey.house = this.houseContract.house;
		sharedKey.id = this.houseContract.id;
		sharedKey.role = AppSettings.identifyRoleStringConst(this.houseContract.role);
		sharedKey.user_house_link_id = this.houseContract.user_house_link_id;
		sharedKey.user = this.houseContract.user;
		return sharedKey;
	}

	renewContract():boolean {
		this.logger.info(this,"User clicked renewContract");
		let sharedKey:UserHouseContractSharedKey = this.prepareSharedKey();
		sharedKey.creationType = AppSettings.CONTRACT_CREATION_TYPES["RENEW"];
		this.logger.log(this, "User wants to renew a contract " + JSON.stringify(sharedKey));
		this.houseContractsService.setSharedKey(sharedKey);
  		this.router.navigate(['../house_contract/0']);
		return false;
	}

	cloneContract():boolean {
		this.logger.info(this,"User clicked cloneContract");
		let sharedKey:UserHouseContractSharedKey = this.prepareSharedKey();
		sharedKey.creationType = AppSettings.CONTRACT_CREATION_TYPES["CLONE"];
		this.logger.log(this, "User wants to renew a contract " + JSON.stringify(sharedKey));
		this.houseContractsService.setSharedKey(sharedKey);
  		this.router.navigate(['../house_contract/0']);
		return false;
	}
}
