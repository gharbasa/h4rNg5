import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HouseContractsService} from  '../../services/HouseContractsService';
import { Payment } from '../../models/Payment';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-received-payments',
  templateUrl: './received-payments.component.html',
  styleUrls: ['./received-payments.component.scss']
})
export class ReceivedPaymentsComponent implements OnInit {
	
	@Input() private payments: any = null;
	@Output() onDeletePaymentClick = new EventEmitter<Payment>();
  	constructor(private logger: LoggingService
			, private houseContractsService:HouseContractsService) { }
  	
  	
	ngOnInit() {
		
	}
	
	deletePayment(payment:any) {
		this.logger.info(this, "user wants to delete the payment " + payment.id);
		this.onDeletePaymentClick.emit(payment);
		return false;
	}
}
