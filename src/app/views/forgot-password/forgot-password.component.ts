import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	
	private user:any = new User();

	constructor(private loginService: LoginService 
  		,private localStorageService: LocalStorageService
		,private logger: LoggingService) { }

	ngOnInit() {
	  
	}

	resetPassword(): void {
		this.logger.info(this, "User clicked resetPassword btn, lets validate input fields.")
	}
}
