import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { Payment } from '../../models/Payment';
import { HouseService } from '../../services/HouseService';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {HouseContractsService} from  '../../services/HouseContractsService';
import {PaymentService} from  '../../services/PaymentService';
import {HouseContract} from '../../models/HouseContract';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.scss']
})
export class ReceivablesComponent implements OnInit {

	private houseContract:any = new HouseContract();
	private payment: any = new Payment();
	private errorMessage:string = "";

  	constructor(private houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService
			, private logger: LoggingService
			, private loginService:LoginService
			, private houseContractsService:HouseContractsService
			, private paymentService: PaymentService) { }

  	ngOnInit() {
  		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.id > 0) {
  				that.fetchExistingContract(res.id);
  			}
  		});
  	}
  	
  	
  	fetchExistingContract(id:number) {
  		let that = this;
  		this.logger.log(this,"Lets extract house contract, id=" + id);
	  	this.houseContractsService.get(id).subscribe(res => {
  			that.houseContract = res;
  			that.houseContract.message = "";
	  		that.houseContract.errorMessage = "";
	  		//Populate defaults in payment object
	  		that.payment.user_house_contract_id = res.id;
	  		that.payment.payment = res.monthly_rent_amount;
	  		that.payment.payment_date = this.getFormattedDate();
	  		
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
	  		that.houseContract.errorMessage = "Problem retrieving house contract.";
  		});
  	}
  	
  	getFormattedDate() {
  		var todayTime = new Date();
  		var month = todayTime.getMonth() + 1;
  		var day = todayTime.getDate();
  		var year = todayTime.getFullYear();
  		return day + "-" + month + "-" + year;
  	}

}
