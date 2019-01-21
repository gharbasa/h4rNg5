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
  public pageSettings:Pagination = new Pagination(null, true, true);

  @Input() accountInput:Account; //Input from Account detail page
  @ViewChild('discreteBarChartAccountMarkingTag') discreteBarChartAccountMarkingTag;
  public  discreteBarChartAccountMarkingIncome: any = [{
		key: "Date",
		values: []
  }];	
  
  public discreteBarChartAccountMarkingOptions: any = {
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
      that.pageSettings = new Pagination(resp, true, true); //We have to build a new instance of pagination, existing instance will not refresh the view.
      let i:number = 0;
      for(i=that.markings.length - 1; i >= 0; i--) {
        let row:any = {
          value: that.markings[i].amount,
          label: UtilityService.dateYear(that.markings[i].markingDate)
        };
        that.discreteBarChartAccountMarkingIncome[0].values.push(row);
      }
      that.discreteBarChartAccountMarkingTag.chart.update();
    });
  }


}
