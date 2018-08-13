import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HouseContractsService } from '../../services/HouseContractsService';
import {HouseContract} from '../../models/HouseContract';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { PerformanceChartsComponent } from './performance-charts.component';
import { HouseService } from '../../services/HouseService';
import { PaymentService } from '../../services/PaymentService';

@Component({
  selector: 'h4r-tab-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabPerformanceChartsComponent extends PerformanceChartsComponent {

	constructor(public houseService: HouseService,
        public logger: LoggingService,
        public paymentService: PaymentService,
        public loginService: LoginService) { 
        super(houseService, logger,paymentService, loginService);
    }

	ngOnInit() {
		
	}
	
	ngOnChanges() {
		if (this.houseInput == null) 
			return;
		else {
			this.house_id = this.houseInput.id
			this.houseChanged();
		}
		let currentYear:number =  (new Date()).getFullYear();
		this.years.length = 0;
		for(let i=0; i<this.currentUser.subscriptionType; i++) {
			this.years.push({year: currentYear - i, label:"Year-"+(currentYear - i)});
		}
	}
}
