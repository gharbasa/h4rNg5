import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import {PaymentService} from  '../../services/PaymentService';
import { House } from '../../models/House';
import { Payment } from '../../models/Payment';
declare let d3: any;

@Component({
  selector: 'h4r-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceChartsComponent implements OnInit {
	private discreteBarChartOptions: any = {
		chart: {
		  type: 'discreteBarChart',
		  height: 250,
		  width: 600,
		  margin : { 
			top: 20,
			right: 20,
			bottom: 50,
			left: 55
		  },
		  x: function(d){return d.label;},
		  y: function(d){return d.value;},
		  showValues: true,
		  valueFormat: function(d){
			return d3.format(',.4f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: 'Timeline'
		  },
		  yAxis: {
			axisLabel: 'Revenue',
			axisLabelDistance: -5
		  }
		}
	};

	private pieChartOptions: any = {
		chart: {
		  type: 'pieChart',
		  height: 250,
		  x: function(d){return d.key;},
		  y: function(d){return d.y;},
		  showLabels: true,
		  duration: 100,
		  labelThreshold: 0.01,
		  labelSunbeamLayout: true,
		  legend: {
			margin: {
			  top: 5,
			  right: 35,
			  bottom: 5,
			  left: 0
			}
		  }
		}
	};


	private houses:Array<House> = [];
	private house_id: number = null;
	private payments:Array<any> = [];
	private year:number = null;
	private years:any = [];
	
	
	@ViewChild('discreteBarChartMonthlyTag') discreteBarChartMonthlyTag;
	public  discreteBarChartDataMonthly: any = [{
		key: "Monthly",
		values: []
	}];	

	@ViewChild('discretePieChartYearlyTag') discretePieChartYearlyTag;
	public  pieChartDataYearly: any = [{
		key: 2013,
		y: 0
	}];

	@ViewChild('discreteBarChartYearlyTag') discreteBarChartYearlyTag;
	public  discreteBarChartDataYearly: any = [{
		key: "Yearly",
		values: []
	}];
	
	constructor(private houseService: HouseService,
			private logger: LoggingService,
			private paymentService: PaymentService) { 

  	}
  	
  	ngOnInit() {
		this.fetchHouses();
		let currentYear:number =  (new Date()).getFullYear();
		this.years = [{year: currentYear}, {year: currentYear - 1}, {year: currentYear - 2}, {year: currentYear - 3}, {year: currentYear - 4}];
  	}

  	fetchHouses() {
		let that = this;
		this.houseService.list4Reports().subscribe(res => {
			that.houses = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	houseChanged() {
		this.logger.info("House changed to " + this.house_id);
		this.discreteBarChartDataMonthly[0].values.length = 0;
		this.fetchMonthlyPayments();
		this.fetchYearlyPayments();
	}

	yearChanged() {
		this.logger.info("Year changed to " + this.house_id);		
		this.fetchMonthlyPayments();
	}

	/**
	 * If payment received more than once in a given month,
	 * 	Sum them all and show as a single payment in that month
	 * @param label 
	 * @param payment 
	 */
	isPaymentRepeatedInMonth(label:string, payment:number) {
		let repeatedNumber = 0;
		let existingRow:any = null;
		this.discreteBarChartDataMonthly[0].values.forEach(function(row:any) {
				if (row.label === label) //There is a month entry already
					existingRow = row;
		});
		return existingRow;
	}

	fetchMonthlyPayments() {
		let that = this;
		this.discreteBarChartDataMonthly[0].values.length = 0;
		this.paymentService.monthlyPayments(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let label = element.paymentMonth + "-" + element.paymentYear;
				let value = element.payment;
				let existingRow = that.isPaymentRepeatedInMonth(label, value);
				if(existingRow == null) {
					existingRow = {
						value: value,
						label: label
					};
					that.discreteBarChartDataMonthly[0].values.push(existingRow);
				}
				else {
					existingRow.value = existingRow.value + value;
				}
				if(that.year == null) that.year = element.paymentYear;
			});
			that.logger.log(that,", detectChanges..that.monthlyBarChartData.values.length=" 
				+ that.discreteBarChartDataMonthly[0].values.length + ",that.monthlyBarChartData="
				 + JSON.stringify(that.discreteBarChartDataMonthly));
			that.discreteBarChartMonthlyTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	fetchYearlyPayments() {
		let that = this;
		that.discreteBarChartDataYearly[0].values.length = 0;
		that.pieChartDataYearly.length = 0;
		this.paymentService.yearlyPayments(this.house_id).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					value: element.value,
					label: element.year
				};
				that.discreteBarChartDataYearly[0].values.push(row);
				that.pieChartDataYearly.push(
					{key: row.label, y: row.value}
				);
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthly[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearly));
			that.discreteBarChartYearlyTag.chart.update();
			that.discretePieChartYearlyTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
