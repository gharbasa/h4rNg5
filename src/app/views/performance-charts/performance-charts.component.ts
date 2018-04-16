import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss']
})
export class PerformanceChartsComponent implements OnInit {
	
	private houses: any = [];
	private house_id: string = null;

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

	public colors = ['red', 'green', 'blue'];
	public  dataColumns = [1]; // Single Bar Chart
	// public  dataColumns = [3]; // Stacked Bar Chart
	// public  dataColumns = [2, 1]; // Multi Stacked Bar Chart
	public  barChartData = [{
	    id: 0,
	    label: 'label1',
	    value1: 10,
	    value2: 10,
	    value3: 10,
	},{
	    id: 1,
	    label: 'label2',
	    value1: 10,
	    value2: 10,
	    value3: 10,
    }];

	constructor(private houseService: HouseService,
			private logger: LoggingService) { 

  	}
  	
  	ngOnInit() {
  		this.fetchHouses();
  	}

  	fetchHouses() {
		let that = this;
		this.houseService.list().subscribe(res => {
			that.houses = res;
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"error fetching houses, err=" + JSON.stringify(err));
		});
	}

	update() {
		this.logger.info("Changed house to " + this.house_id);
	}
}
