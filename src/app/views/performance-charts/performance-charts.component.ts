import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import {PaymentService} from  '../../services/PaymentService';
declare let d3: any;

@Component({
  selector: 'h4r-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceChartsComponent implements OnInit {
	private discreteBarChartOptions: any = {
		chart: {
		  type: 'discreteBarChart',
		  height: 450,
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
			axisLabelDistance: -10
		  }
		}
	  };

	private houses: any = [];
	private house_id: number = null;
	private payments: any = [];
	private year:number = null;
	private years:any = [];
	
	public  discreteBarChartDataMonthly: any = [{
		key: "Cumulative Return",
		values: []
	  }];
	@ViewChild('discreteBarChartMonthlyTag') discreteBarChartMonthlyTag;

	public  discreteBarChartDataYearly: any = [{
		key: "Cumulative Return",
		values: []
	}];
	@ViewChild('discreteBarChartYearlyTag') discreteBarChartYearlyTag;

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
		this.houseService.list(null).subscribe(res => {
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

	fetchMonthlyPayments() {
		let that = this;
		this.discreteBarChartDataMonthly[0].values.length = 0;
		this.paymentService.monthlyPayments(this.house_id, this.year).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					value: element.payment,
					label: element.paymentMonth + "-" + element.paymentYear
				};
				that.discreteBarChartDataMonthly[0].values.push(row);
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
		this.paymentService.yearlyPayments(this.house_id).subscribe(res => {
			that.payments = res;
			that.payments.forEach(element => {
				let row = {
					value: element.value,
					label: element.year
				};
				that.discreteBarChartDataYearly[0].values.push(row);
			});
			that.logger.log(that,", detectChanges..that.discreteBarChartDataYearly.values.length=" 
				+ that.discreteBarChartDataMonthly[0].values.length + ",that.discreteBarChartDataYearly="
				 + JSON.stringify(that.discreteBarChartDataYearly));
			that.discreteBarChartYearlyTag.chart.update();
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

}
