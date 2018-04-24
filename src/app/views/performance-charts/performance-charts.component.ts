import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import {PaymentService} from  '../../services/PaymentService';

@Component({
  selector: 'h4r-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss']
})
export class PerformanceChartsComponent implements OnInit {
	
	private houses: any = [];
	private house_id: number = null;
	private payments: any = [];
	private year:number = null;
	private years:any = [];
	public donutChartData = [{
	    id: 0,
	    label: 'water',
	    value: 20,
	    color: 'red',
	}, {
	    id: 1,
	    label: 'land',
	    value: 20,
	    color: 'blue',
	}, {
	    id: 2,
	    label: 'sand',
	    value: 30,
	    color: 'green',
	}, {
	    id: 3,
	    label: 'grass',
	    value: 20,
	    color: 'yellow',
	}, {
	    id: 4,
	    label: 'earth',
	    value: 10,
	    color: 'pink',
	}];

	public pieChartData = [{
		id: 0,
	    label: 'slice 1',
	    value: 50,
	    color: 'blue',
	}, {
	    id: 1,
	    label: 'slice 2',
	    value: 20,
	    color: 'black',
	}, {
	    id: 2,
	    label: 'slice 3',
	    value: 30,
	    color: 'red',
	}];

	public colors = ['green', 'red', 'blue'];
	public  dataColumns = [1]; // Single Bar Chart
	// public  dataColumns = [3]; // Stacked Bar Chart
	// public  dataColumns = [2, 1]; // Multi Stacked Bar Chart
	public  monthlyBarChartData:Array<any>= [{
	    id: 0,
	    label: 'label1',
	    value1: 10
	},{
	    id: 1,
	    label: 'label2',
	    value1: 1
    }];

	//public monthlyBarChartData = [];
	constructor(private houseService: HouseService,
			private logger: LoggingService,
			private paymentService: PaymentService,
			private changeDetectorRef: ChangeDetectorRef) { 

  	}
  	
  	ngOnInit() {
		  this.fetchHouses();
		  let currentYear:number =  (new Date()).getFullYear();
		  this.years = [{year: currentYear}, {year: currentYear - 1}, {year: currentYear - 2}];
  	}

  	fetchHouses() {
		let that = this;
		this.houseService.list(null).subscribe(res => {
			that.houses = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	houseChanged() {
		this.logger.info("House changed to " + this.house_id);
		let that = this;
		that.monthlyBarChartData.length = 0;
		this.paymentService.monthlyPayments(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					id: element.id,
					value1: element.payment,
					label: element.paymentMonth
				};
				that.monthlyBarChartData.push(row);
			});
			that.logger.log(that,", detectChanges..that.monthlyBarChartData.length=" + that.monthlyBarChartData.length + ",that.monthlyBarChartData=" + JSON.stringify(that.monthlyBarChartData));
			//that.changeDetectorRef.detectChanges();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}
}
