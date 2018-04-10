import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {HouseContractsService} from  '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';

@Component({
  selector: 'h4r-house-contract',
  templateUrl: './house-contract.component.html',
  styleUrls: ['./house-contract.component.scss']
})
export class HouseContractComponent implements OnInit {

  	private houseContract:any = new HouseContract();
	private errorMessage:string = "";
	private newContract:boolean = false;
  	constructor(private houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService
			, private logger: LoggingService
			, private loginService:LoginService
			, private houseContractsService:HouseContractsService) { }

  	ngOnInit() {
  		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.id > 0) {
  				that.newContract = false;
  				that.fetchExistingContract(res.id);
  			} else {
  				this.logger.log(this,"User wants to create a new house");
  				that.newContract = true;
  				that.houseContract.message = "";
  				that.houseContract.errorMessage = "";
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

	  		that.houseContract.roles = "";
  			if(that.houseContract.tenant == true) {
				that.houseContract.roles = that.houseContract.roles + "tenant, ";
	  		}
	  		if(that.houseContract.land_lord == true) {
				that.houseContract.roles = that.houseContract.roles + "land_lord, ";
	  		}
	  		if(that.houseContract.accountant == true) {
				that.houseContract.roles = that.houseContract.roles + "accountant, ";
	  		}
	  		if(that.houseContract.property_mgmt_mgr == true) {
				that.houseContract.roles = that.houseContract.roles + "property_mgmt_mgr, ";
	  		}
	  		if(that.houseContract.property_mgmt_emp == true) {
				that.houseContract.roles = that.houseContract.roles + "property_mgmt_emp, ";
	  		}
	  		if(that.houseContract.agency_collection_emp == true) {
				that.houseContract.roles = that.houseContract.roles + "agency_collection_emp, ";
	  		}
	  		if(that.houseContract.agency_collection_mgr == true) {
				that.houseContract.roles = that.houseContract.roles + "agency_collection_mgr, ";
	  		}
	  		
	  		if(that.houseContract.roles != "") {
	  			let roleStr = that.houseContract.roles;
	  			that.houseContract.roles = roleStr.substring(0, roleStr.length - 2);
	  		}

  		},
  		err => {
  			that.houseContract.message = "";
	  		that.houseContract.errorMessage = "Problem retrieving house.";
  		});
  	}

  	saveRecord() {
  		let that = this;
  		this.logger.log(this,"User wants to edit a house contract, id=" + that.houseContract.id);
  		this.houseContractsService.update(that.houseContract).subscribe(res => {
  			this.logger.log(this,"Sucessfully updated house contract, id=" + that.houseContract.id);
  			this.router.navigate(['postupdate']);
  		},
  		err => {
  			this.logger.err(this,"Error in updating house contract, id=" + that.houseContract.id);
  		}
  	}
}
