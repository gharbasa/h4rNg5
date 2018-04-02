import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';

@Component({
  selector: 'h4r-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {

	private houses: any;

	constructor(private houseService: HouseService) {
		let that = this;
		
		this.houseService.list().subscribe(res => {
			that.houses = res;
			//console.log("notificationTypes =" + JSON.stringify(res));
		}, err=> {
			console.log("error fetching houses, err=" + JSON.stringify(err));
		});
	}

	ngOnInit() {
		
	}

}
