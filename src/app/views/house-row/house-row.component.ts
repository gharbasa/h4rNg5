import { Component, OnInit,Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
/**
 * This is not used at this moment
 */
@Component({
  selector: 'h4r-house-row',
  templateUrl: './house-row.component.html',
  styleUrls: ['./house-row.component.scss']
})
export class HouseRowComponent implements OnInit {

	@Input() house:any;
	constructor() { }

	ngOnInit() {
	}

}
