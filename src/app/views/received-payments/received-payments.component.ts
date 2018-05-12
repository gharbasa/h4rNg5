import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from '../../models/Payment';
import { LoggingService, Config } from 'loggerservice';
import { CurrencyPipe } from '@angular/common';
import {Pagination} from  '../../models/Pagination';
import { HouseContract } from '../../models/HouseContract';

@Component({
  selector: 'h4r-received-payments',
  templateUrl: './received-payments.component.html',
  styleUrls: ['./received-payments.component.scss']
})
export class ReceivedPaymentsComponent implements OnInit {
	
	public pageSettings:Pagination = new Pagination(null);
	@Input() public payments: Array<Payment> = [];
	@Input() public houseContract:HouseContract;
	@Output() onDeletePaymentClick = new EventEmitter<Payment>();
	public totalReceivedAmt:number = 0;
	
  	constructor(private logger: LoggingService) { }
  	
	ngOnInit() {}
	ngOnChanges() {
		this.totalReceivedAmt = 0;
		let that = this;
		if(this.payments != null && this.payments.length > 0) {
			that.pageSettings = new Pagination(this.payments); //We have to build a new instance of pagination, existing instance will not refresh the view.
			that.logger.info(this, "number of entries=" + this.payments.length);
			this.payments.forEach(function(payment) {
				that.logger.info(that, "value=" + payment.payment);
				that.totalReceivedAmt +=  payment.payment;
			});
		}
	}
	
	deletePayment(payment:any) {
		this.logger.info(this, "user wants to delete the payment " + payment.id);
		this.onDeletePaymentClick.emit(payment);
		return false;
	}
}
