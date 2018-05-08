import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { LoginService } from '../../services/login.service';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import {Pagination} from  '../../models/Pagination';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends H4rbaseComponent {

	private pageSettings:Pagination = new Pagination(null);

	constructor(private userService: UserService,
			private logger: LoggingService, 	
			public loginService: LoginService) {
				super(loginService);
  	}
	
	ngOnInit() {
		this.refreshUsersList();
	}

	refreshUsersList() {
		let that = this;
		this.logger.info(this, "this.community_id=" + this.community_id);
		if(this.community_id == null)
			this.pageSettings = new Pagination(this.loginService.getUsers()); //We have to build a new instance of pagination, existing instance will not refresh the view.
		else {
			this.userService.filterByCommunity(this.community_id).subscribe(resp => {
				this.logger.info(this, "Successfully filterByCommunity.");
				resp.forEach(function (user) {
					that.loginService.appendUserViewAttrs(user);
				});
				that.pageSettings = new Pagination(resp);
			},
			err => {
				that.pageSettings = new Pagination(null);
				this.logger.error(this, "Problem in resetting the password.");
			});	
		}
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

	resetPasswordAdmin(user:any) {
		this.userService.resetPasswordAdmin(user.id).subscribe(resp => {
			this.logger.info(this, "Successfully reset the password.");
			this.refreshUsersList();
		},
		err => {
			this.logger.error(this, "Problem in resetting the password.");
		});	
		return false;
	}

	changeSubscription(user:User):void {
		this.logger.info("user.subscriptionType=" + user.subscriptionType);
		this.userService.changeSubscription(user).subscribe(resp => {
			this.logger.info(this, "Successfully changed subscription.");
			this.refreshUsersList();
		},
		err => {
			this.logger.error(this, "Probleming changing subscription.");
		});	
	}
}
