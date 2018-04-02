import { Component, OnInit } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';


@Component({
  selector: 'h4r-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	private logo:any = require("assets/img/logo.png");

	constructor(private logger: LoggingService) { }

	ngOnInit() {
	}

}
