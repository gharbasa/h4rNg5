import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import {PaymentService} from  '../../services/PaymentService';
import { House } from '../../models/House';
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
	public yearlyExpense:number = 0;
	public yearlyIncome:number = 0;
	public monthlyIncome:number = 0;
	public monthlyExpense:number = 0;
	@Input() houseInput:House; //Input from Account detail page

	public discreteRevenueBarChartOptions: any = {
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
			return d3.format('.0f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: ''
		  },
		  yAxis: {
			axisLabel: '',
			axisLabelDistance: -5
		  }
		}
	};

	public discreteExpenseBarChartOptions: any = {
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
			return d3.format('.0f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: ''
		  },
		  yAxis: {
			axisLabel: '',
			axisLabelDistance: -5
		  }
		}
	};

	public discreteMonthlyExpenseBarChartOptions: any = {
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
			return d3.format('.0f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: ''
		  },
		  yAxis: {
			axisLabel: '',
			axisLabelDistance: -5
		  },
		  tooltip: {
			contentGenerator: function(d) { 
				//console.log("Abed--" + JSON.stringify(d.data));
				if(d.data.note) {
					return d.data.note; 
				}
				return undefined;
			}
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
	
	constructor(public houseService: HouseService,
				public logger: LoggingService,
				public paymentService: PaymentService,
				public loginService: LoginService) { 
			super(loginService);
  	}
  	
  	ngOnInit() {
		if (this.houseInput == null) 
			this.fetchHouses();
		else {
			this.house_id = this.houseInput.id
			this.houseChanged();
		}

		let currentYear:number =  (new Date()).getFullYear();
		this.years.length = 0;
		for(let i=0; i<this.currentUser.subscriptionType; i++) {
			this.years.push({year: currentYear - i, label:"Year-"+(currentYear - i)});
		}
  	};

  	fetchHouses() {
		this.logger.info(this,"Fetching houses");
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
		that.monthlyIncome = 0;
		this.discreteBarChartDataMonthlyIncome[0].values.length = 0;
		this.paymentService.monthlyIncome(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let label = element.paymentMonth;// + "-" + element.paymentYear;
				let value = element.amount;
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
				that.monthlyIncome = that.monthlyIncome + value;
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

	buildNote(payment:any, bar:any, isExistingBar:boolean):void {
		
		//if(element.contract && element.contract.note) {
			if(!isExistingBar)
				bar.note = payment.contract.note;
			else {
				const contractNote:string = payment.contract.note;
				if (bar.note.indexOf(contractNote) == -1) {
					bar.note += "<br>" + payment.contract.note;
				} 
			}
		//}
		
		//if(element.note) {
			if (bar.note)
				bar.note += "<br>&nbsp;&nbsp;&nbsp;(" + payment.amount + ")" + payment.note;
			//else
			//bar.note = element.note;
		//}
		
	}

	fetchMonthlyExpense() {
		let that = this;
		that.monthlyExpense = 0;
		this.discreteBarChartDataMonthlyExpense[0].values.length = 0;
		this.paymentService.monthlyExpenses(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(payment => {
				let label = payment.paymentMonth;// + "-" + element.paymentYear;
				let value = payment.amount;
				let existingRow = that.isPaymentRepeatedInMonth(label, value, that.discreteBarChartDataMonthlyExpense);
				if(existingRow == null) {
					existingRow = {
						value: value,
						label: label
					};
					that.buildNote(payment, existingRow, false);
					that.discreteBarChartDataMonthlyExpense[0].values.push(existingRow);
				}
				else {
					existingRow.value = existingRow.value + value;
					that.buildNote(payment, existingRow, true);
				}
				that.monthlyExpense = that.monthlyExpense + value;
				if(that.year == null) that.year = payment.paymentYear;
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
		that.yearlyIncome = 0;
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
				that.yearlyIncome = that.yearlyIncome + row.value;
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthlyIncome[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearlyIncome));
			that.discreteBarChartYearlyIncomeTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	fetchYearlyExpense() {
		let that = this;
		that.yearlyExpense = 0;
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
				that.yearlyExpense = that.yearlyExpense + row.value;
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthlyExpense[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearlyExpense));
			that.discreteBarChartYearlyExpenseTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
