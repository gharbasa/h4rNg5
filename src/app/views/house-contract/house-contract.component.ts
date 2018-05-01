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

@Component({
  selector: 'h4r-house-contract',
  templateUrl: './house-contract.component.html',
  styleUrls: ['./house-contract.component.scss']
})
export class HouseContractComponent implements OnInit {

 	private houseContract:HouseContract = new HouseContract();
	private errorMessage:string = "";
	private newContract:boolean = false;

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
          let key:any = that.houseContractsService.getSharedKey(); //house_user_role
          that.logger.log(that,"User is launched from House User Links, lets get the key=" + key);
          that.houseContractsService.setSharedKey(null);
          that.houseContract.renew = key.renew;
          that.houseContract.user = key.user;
          that.houseContract.user_id = key.user.id;
          that.houseContract.house = key.house;
          that.houseContract.house_id = key.house.id;
          that.houseContract.user_house_link_id = key.user_house_link_id;
          that.houseContract.roles = AppSettings.ROLES[key.role].label;
          that.houseContract.role = AppSettings.ROLES[key.role].value;
          that.houseContract.active = true;

          if(key.renew == true) {
            this.logger.log(this, "User wants to renew an existing contractId=" + key.id + ", lets fetch it first.");
            this.houseContractsService.get(key.id).subscribe(res => {
              that.houseContract.contract_start_date = res.contract_end_date;
              that.houseContract.contract_end_date = "";
              that.houseContract.annual_rent_amount = res.annual_rent_amount;
              that.houseContract.monthly_rent_amount = res.monthly_rent_amount;
              that.houseContract.active = true;
              that.houseContract.from_contract_id = key.id; //lets see if server can take this.
            },err => {
              that.houseContract.errorMessage = "Problem fetching existing contract. please try again after sometime.";
              this.logger.error(this,that.houseContract.errorMessage);  
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
			that.houseContractsService.appendRoles(that.houseContract);
	  		
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
}
