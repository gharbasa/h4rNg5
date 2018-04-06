import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';

@Component({
  selector: 'h4r-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	private users: any;

	constructor(private userService: UserService,
			private logger: LoggingService) {
  		
  	}
	
	ngOnInit() {
		let that = this;
		this.userService.list().subscribe(res => {
			that.users = res;
			for(var i in that.users) {
				let user:any = that.users[i];
				user.avatar = AppSettings.H4R_BACKEND_URL + user.avatar;
			}
			//this.logger.log(this,"users =" + JSON.stringify(res));
		}, err=> {
			this.logger.error(this,"users err=" + JSON.stringify(err));
		});
	}

}
