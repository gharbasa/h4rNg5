import { Component, OnInit, Input } from '@angular/core';
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
  	constructor(private logger: LoggingService
			, private houseContractsService:HouseContractsService) { }
  	
  	
	ngOnInit() {
		
	}

}
