import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import {PaymentService} from  '../../services/PaymentService';
import { House } from '../../models/House';
import { Payment } from '../../models/Payment';
import { LoginService } from '../../services/login.service';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
declare let d3: any;

@Component({
  selector: 'h4r-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceChartsComponent extends H4rbaseComponent {
	public discreteBarChartOptions: any = {
		chart: {
		  type: 'discreteBarChart',
		  height: 250,
		  width: 400,
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

	public pieChartOptions: any = {
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


	public houses:Array<House> = [];
	public house_id: number = null;
	public payments:Array<any> = [];
	public year:number = null;
	public years:any = [];
	
	
	@ViewChild('discreteBarChartMonthlyIncomeTag') discreteBarChartMonthlyIncomeTag;
	@ViewChild('discretePieChartYearlyIncomeTag') discretePieChartYearlyIncomeTag;
	@ViewChild('discreteBarChartYearlyIncomeTag') discreteBarChartYearlyIncomeTag;

	@ViewChild('discreteBarChartMonthlyExpenseTag') discreteBarChartMonthlyExpenseTag;
	@ViewChild('discretePieChartYearlyExpenseTag') discretePieChartYearlyExpenseTag;
	@ViewChild('discreteBarChartYearlyExpenseTag') discreteBarChartYearlyExpenseTag;

	public  discreteBarChartDataMonthlyIncome: any = [{
		key: "Monthly",
		values: []
	}];	
	public  discreteBarChartDataMonthlyExpense: any = [{
		key: "Monthly",
		values: []
	}];	

	public  pieChartDataYearlyIncome: any = [{
		key: 2013,
		y: 0
	}];
	public  pieChartDataYearlyExpense: any = [{
		key: 2013,
		y: 0
	}];

	public  discreteBarChartDataYearlyIncome: any = [{
		key: "Yearly",
		values: []
	}];
	public  discreteBarChartDataYearlyExpense: any = [{
		key: "Yearly",
		values: []
	}];
	
	constructor(private houseService: HouseService,
			private logger: LoggingService,
			private paymentService: PaymentService,
			public loginService: LoginService) { 
				super(loginService);
  	}
  	
  	ngOnInit() {
		this.fetchHouses();
		let currentYear:number =  (new Date()).getFullYear();
		this.years.length = 0;
		for(let i=0; i<this.currentUser.subscriptionType; i++) {
			this.years.push({year: currentYear - i, label:"Year-"+(currentYear - i)});
		}
  	};

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
		this.discreteBarChartDataMonthlyIncome[0].values.length = 0;
		this.discreteBarChartDataMonthlyExpense[0].values.length = 0;
		this.fetchMonthlyIncome();
		this.fetchYearlyIncome();
		this.fetchMonthlyExpense();
		this.fetchYearlyExpense();
	}

	yearChanged() {
		this.logger.info("Year changed to " + this.house_id);		
		this.fetchMonthlyIncome();
		this.fetchMonthlyExpense();
	}

	/**
	 * If payment received more than once in a given month,
	 * 	Sum them all and show as a single payment in that month
	 * @param label 
	 * @param payment 
	 */
	isPaymentRepeatedInMonth(label:string, payment:number, discreteBarChartDataMonthly) {
		let repeatedNumber = 0;
		let existingRow:any = null;
		discreteBarChartDataMonthly[0].values.forEach(function(row:any) {
				if (row.label === label) //There is a month entry already
					existingRow = row;
		});
		return existingRow;
	}

	fetchMonthlyIncome() {
		let that = this;
		this.discreteBarChartDataMonthlyIncome[0].values.length = 0;
		this.paymentService.monthlyIncome(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let label = element.paymentMonth + "-" + element.paymentYear;
				let value = element.payment;
				let existingRow = that.isPaymentRepeatedInMonth(label, value, that.discreteBarChartDataMonthlyIncome);
				if(existingRow == null) {
					existingRow = {
						value: value,
						label: label
					};
					that.discreteBarChartDataMonthlyIncome[0].values.push(existingRow);
				}
				else {
					existingRow.value = existingRow.value + value;
				}
				if(that.year == null) that.year = element.paymentYear;
			});
			that.logger.log(that,", detectChanges..that.monthlyBarChartData.values.length=" 
				+ that.discreteBarChartDataMonthlyIncome[0].values.length + ",that.monthlyBarChartData="
				 + JSON.stringify(that.discreteBarChartDataMonthlyIncome));
			that.discreteBarChartMonthlyIncomeTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	fetchMonthlyExpense() {
		let that = this;
		this.discreteBarChartDataMonthlyExpense[0].values.length = 0;
		this.paymentService.monthlyExpense(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let label = element.paymentMonth + "-" + element.paymentYear;
				let value = element.payment;
				let existingRow = that.isPaymentRepeatedInMonth(label, value, that.discreteBarChartDataMonthlyExpense);
				if(existingRow == null) {
					existingRow = {
						value: value,
						label: label
					};
					that.discreteBarChartDataMonthlyExpense[0].values.push(existingRow);
				}
				else {
					existingRow.value = existingRow.value + value;
				}
				if(that.year == null) that.year = element.paymentYear;
			});
			that.logger.log(that,", detectChanges..that.monthlyBarChartData.values.length=" 
				+ that.discreteBarChartDataMonthlyExpense[0].values.length + ",that.monthlyBarChartData="
				 + JSON.stringify(that.discreteBarChartDataMonthlyExpense));
			that.discreteBarChartMonthlyExpenseTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	fetchYearlyIncome() {
		let that = this;
		that.discreteBarChartDataYearlyIncome[0].values.length = 0;
		that.pieChartDataYearlyIncome.length = 0;
		this.paymentService.yearlyIncome(this.house_id).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					value: element.value,
					label: element.year
				};
				that.discreteBarChartDataYearlyIncome[0].values.push(row);
				that.pieChartDataYearlyIncome.push(
					{key: row.label, y: row.value}
				);
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthlyIncome[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearlyIncome));
			that.discreteBarChartYearlyIncomeTag.chart.update();
			that.discretePieChartYearlyIncomeTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	fetchYearlyExpense() {
		let that = this;
		that.discreteBarChartDataYearlyExpense[0].values.length = 0;
		that.pieChartDataYearlyExpense.length = 0;
		this.paymentService.yearlyExpense(this.house_id).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					value: element.value,
					label: element.year
				};
				that.discreteBarChartDataYearlyExpense[0].values.push(row);
				that.pieChartDataYearlyExpense.push(
					{key: row.label, y: row.value}
				);
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthlyExpense[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearlyExpense));
			that.discreteBarChartYearlyExpenseTag.chart.update();
			that.discretePieChartYearlyExpenseTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
