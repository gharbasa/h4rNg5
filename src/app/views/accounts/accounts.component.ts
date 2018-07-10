import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { AccountService } from '../../services/AccountService';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent extends H4rbaseComponent {

  public errorMessage:string = "";
  
  constructor(private logger: LoggingService, public loginService: LoginService, private accountService:AccountService) { 
    super(loginService);
  }

  ngOnInit() {
		this.fetchAccounts();
	}
	
	fetchAccounts():void {
		let that = this;
		this.accountService.list().subscribe(res => {
			that.pageSettings = this.createPaginationObject(res);
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			that.pageSettings = this.createPaginationObject(null);
			this.logger.error(this,"error fetching communities, err=" + JSON.stringify(err));
		});
	}

}
