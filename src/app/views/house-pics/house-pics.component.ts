import { Component, OnInit, Input} from '@angular/core';
import { House } from '../../models/House';
import { HousePicsService } from '../../services/HousePicsService';
import { HousePic } from '../../models/HousePic';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';

HousePicsService
@Component({
  selector: 'h4r-house-pics',
  templateUrl: './house-pics.component.html',
  styleUrls: ['./house-pics.component.scss']
})
export class HousePicsComponent implements OnInit {
	
	@Input() house:any;
	private housePics:any = [];
	constructor(private housePicsService: HousePicsService, private logger: LoggingService) { 
		
	}

	ngOnInit() {
	}
	ngOnChanges() {
	//ngAfterContentInit() {
		let that = this;
		if(this.house.id == 0) return;
		this.logger.log(this,"HousePics houseid=" + this.house.id);
		this.housePicsService.listByHouse(this.house.id).subscribe(resp => {
			for(var i in resp) {
				var row = resp[i];
				row.image = AppSettings.H4R_BACKEND_URL + row.picture;
				that.housePics.push(row);
			}
			this.logger.log(this, "Number of House Pics=" +  that.housePics.length);
		},
		err => {
			this.logger.log(this, "Error fetching house pics associated with the house=" +  this.house.id);	
		});
	}
}
