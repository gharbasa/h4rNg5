import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { LoggingService, Config } from 'loggerservice';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	
	private user:User = new User();
	private errorMessage:string = "";
	private message: string = "";
	constructor(private logger: LoggingService
		,private userService: UserService) { }

	ngOnInit() {
	  
	}
	
	forgotPassword(): void {
		let that = this;
		this.logger.info(this, "User clicked forgotPassword btn, lets validate input fields.")
		//TODO: validate input fields.
		this.userService.forgotPassword(this.user).subscribe(res => {
			that.logger.info(this, "User clicked resetPassword btn, lets validate input fields.")
			that.message = "Password is changed successful.";
			that.errorMessage = "";
		},
		err => {
			that.logger.info(this, "There is an error in resetPassword." + JSON.stringify(err));
			that.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"There is an error in reset password.";
		});
	}
}
