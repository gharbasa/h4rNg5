import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/AccountService';
import { LoggingService } from '../../../../node_modules/loggerservice';
import { AccountMarking } from '../../models/AccountMarking';
import {Pagination} from  '../../models/Pagination';
import { UtilityService } from '../../services/UtilityService';
import { MonthTransaction } from '../../models/MonthTransaction';

declare let d3: any;

@Component({
  selector: 'h4r-account-markings',
  templateUrl: './account-markings.component.html',
  styleUrls: ['./account-markings.component.scss']
})
export class AccountMarkingsComponent implements OnInit {

  public markings:AccountMarking[] = [];
  public currentMark:AccountMarking = null;
  public monthTransactions:MonthTransaction[] = [];
  public totalAmount:number = 0;
  public pageSettings:Pagination = new Pagination(null, true, true, "",[]);
  @Input() accountInput:Account; //Input from Account detail page
  
  public pastNetIncome:string = "Past Net Income";
  public monthIncome:string = "Consecutive Month Income";
  @ViewChild('multiBarChartAccountMarkingTag') multiBarChartAccountMarkingTag;
  
  public houseIncome:string = "House Income";
  public month:string = "Month";
  @ViewChild('multiBarChartMonthlyIncomeTag') multiBarChartMonthlyIncomeTag;

  public  multiBarChartAccountMarkingIncome: any = [
    {
		  key: this.pastNetIncome,
		  values: []
    },
    {
		  key: this.monthIncome,
		  values: []
    }
  ];

  public  multiBarChartMonthlyIncome: any = [
    {
		  key: this.houseIncome,
		  values: []
    },
    {
		  key: this.month,
		  values: []
    }
  ];
  
  public multiBarChartAccountMarkingOptions: any = {
		chart: {
		  type: 'multiBarChart',
		  height: 250,
		  width: 600,
		  margin : { 
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
		  },
		  
		  showValues: true,
		  valueFormat: function(d){
			return d3.format('.0f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: 'mm-yy'
		  },
		  yAxis: {
			axisLabel: '',
			axisLabelDistance: -5
		  }
		}
  };

  public multiBarChartMonthlyIncomeOptions: any = {
		chart: {
		  type: 'multiBarChart',
		  height: 250,
		  width: 600,
		  margin : { 
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
		  },
		  
		  showValues: true,
		  valueFormat: function(d){
			return d3.format('.0f')(d);
		  },
		  duration: 100,
		  xAxis: {
			axisLabel: 'mm-yy'
		  },
		  yAxis: {
			axisLabel: '',
			axisLabelDistance: -5
		  }
		}
  };
  
  constructor(private accountService: AccountService
    , private logger: LoggingService) { }

  ngOnInit() {
		
	}
	
	ngOnChanges() {
		if (this.accountInput == null) 
			return;
		else {
      this.fetchAccountHistory();
      let that = this;
      Account.markedAccount.subscribe((flag:string) => {
        that.fetchAccountHistory();
      });
    }
    
  }
  
  fetchAccountHistory():void {
    this.multiBarChartAccountMarkingIncome[0].values.length = 0;

    let that = this;
    this.accountService.markings(this.accountInput.id).subscribe(resp => {
      that.markings = resp;
      that.pageSettings = new Pagination(resp, true, true, "", []); //We have to build a new instance of pagination, existing instance will not refresh the view.
      let i:number = 0;
      if(that.markings.length > 0)
        that.markings[0].delta = that.accountInput.netAmount - that.markings[0].amount;
      for(i=that.markings.length - 1; i >= 0; i--) {
        if(that.markings[i-1] && that.markings[i])
          that.markings[i].delta = that.markings[i-1].amount - that.markings[i].amount;
        
          let previousBalance:any = {
            y: that.markings[i].amount,
            x: UtilityService.dateYear(that.markings[i].markingDate)
          };
          that.multiBarChartAccountMarkingIncome[0].values.push(previousBalance);

          let currentIncome:any = { 
            y: that.markings[i].delta,
            x: UtilityService.dateYear(that.markings[i].markingDate)
          };
          that.multiBarChartAccountMarkingIncome[1].values.push(currentIncome);

      }
      that.multiBarChartAccountMarkingTag.chart.update();
      this.fetchTransactionDetails(that.markings[0]);
    });
  }

  fetchTransactionDetails(accountMarking:AccountMarking) {
    let that = this;
    this.currentMark = accountMarking;
    let date:string = accountMarking.markingDate; //dd-mm-yyyy
    let tokens:string[] = date.split("-");
    this.accountService.allMonthlyIncome(accountMarking.account_id, tokens[1], tokens[2]).subscribe(resp => {
      that.monthTransactions = resp;
      that.totalAmount = 0;
      that.monthTransactions.forEach(function (monthTransaction) {
        if(monthTransaction.transType == 1) 
          that.totalAmount += monthTransaction.amount;
        if(monthTransaction.transType == 2) 
          that.totalAmount -= monthTransaction.amount;
      });
    });
  }


}
