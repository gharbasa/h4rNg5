import { Component, OnInit, Input } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {

	@Input() user:any;
  	constructor(private logger: LoggingService) { 
  		
  	}

  	ngOnInit() {
  		
  	}

}
