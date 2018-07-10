import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { UtilityService } from '../../services/UtilityService';

@Component({
  selector: 'h4r-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.scss'] 
})
export class ReceivablesComponent implements OnInit {

	public houseContract:HouseContract = new HouseContract();
	public payment: Payment = new Payment();
	public errorMessage:string = "";
	public message:string = "";
	public houseContractId:number = 0;
	public payments: Array<Payment> = [];
	
	@ViewChild('paymentDate')
	paymentDate: DatePickerComponent;

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
			that.resetDefaults();
	  		HouseContract.determineContractTypeStr(that.houseContract);
	  		HouseContract.determineRoles(that.houseContract);
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
	  
	resetDefaults() {
		this.payment.note = "";
		this.payment.amount = this.houseContract.monthly_rent_amount;
		this.payment.payment_date = UtilityService.getFormattedDate();
		this.payment.user_house_contract_id = this.houseContract.id;
	}
  	saveRecord() {
  		let that = this;
  		this.paymentService.create(this.payment).subscribe(res => {
  			that.message = "Payment has been received successfully.";
  			this.logger.log(this,that.message);
	  		that.errorMessage = "";
			that.fetchPayments();
			that.resetDefaults();
  		},
  		err => {
  			that.message = "";
  			that.errorMessage = "Error in receiving payment. Please try again or contact support.";
  			this.logger.log(this,that.message + " " + err.error.errorMessage);
  		});
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
	  
	  paymentDateChanged(elementValue:string) {
		this.logger.log(this, elementValue + " date changed");// to " + JSON.stringify(this.paymentDate.getValue()));
		//let selectedDate = this.paymentDate.getDate();//{"year":2018,"month":4,"day":1}
		//this.payment.payment_date = selectedDate.day + "-" + selectedDate.month + "-" + selectedDate.year;
		this.payment.payment_date = elementValue;//this.paymentDate.getValue();
	  }

}