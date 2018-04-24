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
	private message:string = "";
	private houseContractId:number = 0;
	private payments: any = null;
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
  				that.houseContractId = res.id;
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
	  		that.fetchPayments();
  		},
  		err => {
  			that.message = "";
	  		that.errorMessage = "Problem retrieving house contract.";
  		}); 
  	}
  	
  	saveRecord() {
  		let that = this;
  		this.paymentService.create(this.payment).subscribe(res => {
  			that.message = "Payment has been received successfully.";
  			this.logger.log(this,that.message);
	  		that.errorMessage = "";
	  		//this.logger.info(this, "Trigerring onPaymentReceived.....");
	  		that.fetchPayments();
  		},
  		err => {
  			that.message = "";
  			that.errorMessage = "Error in receiving payment. Please try again or contact support.";
  			this.logger.log(this,that.message + " " + err.error.errorMessage);
  		});
  	}
  	
  	getFormattedDate() {
  		var todayTime = new Date();
  		var month = todayTime.getMonth() + 1;
  		var day = todayTime.getDate();
  		var year = todayTime.getFullYear();
  		return day + "-" + month + "-" + year;
  	}
  	
  	fetchPayments() {
		let that = this;
  		this.logger.log(this,"Lets extract payments received so far for the contract is " + this.houseContractId);
	  	this.houseContractsService.receivedPayments(this.houseContractId).subscribe(res => {
	  		this.logger.log(this,"receivedPayments=" + res.length);
	  		that.payments = res;
	  	},
	  	err => {
	  		this.logger.log(this,"problem fetching receivedPayments");
	  	});
	}
  	
  	deletePayment(payment:Payment) {
  		let that = this;
  		
  		this.paymentService.remove(payment.id).subscribe(res => {
  			that.message = "Successfully deleted payment " + payment.id;
  			this.logger.log(this,that.message);
	  		that.errorMessage = "";
	  		that.fetchPayments();
  		},
  		err => {
  			that.message = "";
  			that.errorMessage = "Error in deleting payment. Please try again or contact support.";
  			this.logger.log(this,that.message + " " + err.error.errorMessage);
  		});
  	}

}