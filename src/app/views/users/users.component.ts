import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { LoginService } from '../../services/login.service';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	private users: any;
	private currentUser:any = null;
	constructor(private userService: UserService,
			private logger: LoggingService, 	
			private loginService: LoginService) {
  	}
	
	ngOnInit() {
		this.refreshUsersList();
	}

	refreshUsersList() {
		let that = this;
		this.currentUser = this.loginService.getCurrentUser();
		this.users = this.loginService.getUsers();	
	}
	
	promoteUser(user:any) {
		this.logger.info(this,"User going to be promoted/demoted to/from admin is " + user.fullName);
		let that = this;
		if(user.promote2Admin === true) {
			this.userService.promote2Admin(user).subscribe(res => {
				this.logger.info(this, "Successfully promoted.");
				that.loginService.refreshUsersList();
				//do not update users list here
			},
			err => {
				this.logger.error(this, "Error in promoting the user.");
			});
		}else {
			this.userService.demoteFromAdmin(user).subscribe(res => {
				this.logger.info(this, "Successfully demoted.");
				that.loginService.refreshUsersList();
				//do not update users list here
			},
			err => {
				this.logger.error(this, "Error in demoting the user.");
			});
		}
	}

	resetPassword(user:any) {
		this.userService.resetPasswordAdmin(user.id).subscribe(resp => {
			this.logger.info(this, "Successfully reset the password.");
			this.refreshUsersList();
		},
		err => {
			this.logger.error(this, "Problem in resetting the password.");
		});	
		return false;
	}

}
