import { Component, OnInit } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'h4r-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	public logo:any = require("assets/img/logo.png");

	constructor(private logger: LoggingService
			,private loginService: LoginService) { }

	ngOnInit() {
		if(this.loginService.isUserLogin())
			this.loginService.postLoginActivity();
	}

}
