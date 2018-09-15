import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/AccountService';
import { LoggingService } from '../../../../node_modules/loggerservice';
import { AccountMarking } from '../../models/AccountMarking';
import {Pagination} from  '../../models/Pagination';

@Component({
  selector: 'h4r-account-markings',
  templateUrl: './account-markings.component.html',
  styleUrls: ['./account-markings.component.scss']
})
export class AccountMarkingsComponent implements OnInit {

  public markings:AccountMarking[] = [];
  public pageSettings:Pagination = new Pagination(null, true, true);

  @Input() accountInput:Account; //Input from Account detail page

  constructor(private accountService: AccountService
    , private logger: LoggingService) { }

  ngOnInit() {
		
	}
	
	ngOnChanges() {
		if (this.accountInput == null) 
			return;
		else {
      this.fetchAccountHistory();
      let that = this;
      Account.markedAccount.subscribe((flag:string) => {
        that.fetchAccountHistory();
      });
    }
    
  }
  
  fetchAccountHistory():void {
    let that = this;
    this.accountService.markings(this.accountInput.id).subscribe(resp => {
      that.markings = resp;
      that.pageSettings = new Pagination(resp, true, true); //We have to build a new instance of pagination, existing instance will not refresh the view.
    });
  }

}
