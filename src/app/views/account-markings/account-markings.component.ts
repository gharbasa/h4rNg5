import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/AccountService';
import { LoggingService } from '../../../../node_modules/loggerservice';
import { AccountMarking } from '../../models/AccountMarking';
import {Pagination} from  '../../models/Pagination';
import { UtilityService } from '../../services/UtilityService';

declare let d3: any;

@Component({
  selector: 'h4r-account-markings',
  templateUrl: './account-markings.component.html',
  styleUrls: ['./account-markings.component.scss']
})
export class AccountMarkingsComponent implements OnInit {

  public markings:AccountMarking[] = [];
  public pageSettings:Pagination = new Pagination(null, true, true, "",[]);

  @Input() accountInput:Account; //Input from Account detail page
  @ViewChild('discreteBarChartAccountMarkingTag') discreteBarChartAccountMarkingTag;
  public  discreteBarChartAccountMarkingIncome: any = [
    {
		  key: "Past Net Income",
		  values: []
    },
    {
		  key: "Month Income",
		  values: []
    }
  ];	
  
  public discreteBarChartAccountMarkingOptions: any = {
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
			axisLabel: ''
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
    this.discreteBarChartAccountMarkingIncome[0].values.length = 0;

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
          that.discreteBarChartAccountMarkingIncome[0].values.push(previousBalance);

          let currentIncome:any = {
            y: that.markings[i].delta,
            x: UtilityService.dateYear(that.markings[i].markingDate)
          };
          that.discreteBarChartAccountMarkingIncome[1].values.push(currentIncome);

      }
      that.discreteBarChartAccountMarkingTag.chart.update();
    });
  }


}
