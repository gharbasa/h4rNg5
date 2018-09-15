import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountService } from '../../services/AccountService';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggingService } from 'loggerservice';
import { HouseService } from '../../services/HouseService';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { UtilityService } from '../../services/UtilityService';
import { House } from '../../models/House';
import { AccountMarking } from '../../models/AccountMarking';

@Component({
  selector: 'h4r-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public account:Account = new Account();
  public editaccount:boolean = false;
  public createNewAccount:boolean = false;
  public houses:Array<House> = [];
  public activeHouse:House = null;
  public isMarkingTab:boolean = false;

  @ViewChild('baselineDate')
  baselineDate: DatePickerComponent;
  
  	constructor(private accountService: AccountService
			, private router: Router
			, private route: ActivatedRoute
			, private logger: LoggingService
      , private houseService:HouseService) { 
  		
  	}

    ngOnInit() {
  		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				this.logger.log(this,"User wants to create a new account");
  				that.editaccount = false;
  				that.account.message = "";
  				that.account.errorMessage = "";
				that.createNewAccount = true;
				that.account.baselineDate = that.account.baseline_date = UtilityService.getFormattedDate();
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				this.logger.log(this,"User wants to edit account, id=" + res.id);
  				this.accountService.get(res.id).subscribe(res => {
  					that.account = res;
  					that.account.message = "";
						that.account.errorMessage = "";
						that.fetchHousesTabs();
  				},
  				err => {
  					that.account.message = "";
	  				that.account.errorMessage = "Problem retrieving account.";
  				});
  			}
  		});
  	}
  	
  	saveRecord() {
		if(this.account.note == null || this.account.note == "")
		{
			this.account.errorMessage = "Note can not be empty.";
			return;
		}
		if(this.account.id !== 0) {
			this.update();
		} else {
			this.create();
		}
	}
	
	create() {
		this.logger.log(this,"Creating a new account");
		this.accountService.create(this.account).subscribe(res => {
			this.logger.log(this,"account is successfully created");
			this.account.message = "Successfully created account.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"problem creating the account: " + JSON.stringify(err));
			this.account.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem creating the account";
		});
	}
	
	update() {
    this.logger.log(this,"Udpating the account id=" + this.account.id);
    this.account.baseline_date = this.account.baselineDate;//this.paymentDate.getValue();
		this.accountService.update(this.account).subscribe(res => {
			this.logger.log(this,"Successfully updated");
			this.account.message = "Successfully updated the account.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"Problem updating the account: " + JSON.stringify(err));
			this.account.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the account";
		});
  }
  
  baselineDateChanged(elementValue:string) {
    this.logger.info(this,"Ok, baseline date changed to=" + this.baselineDate.getValue());
    this.account.baselineDate = elementValue;//this.paymentDate.getValue();
	}
	
	fetchHousesTabs():void {
		let that = this;
		this.logger.log(this,"Fetching houses in a given account=" + this.account.id);
		this.accountService.houses(this.account.id).subscribe(res => {
			this.logger.log(this,"Successfully fetched houses");
			that.houses = res;
			if(res.length > 0)
				that.makeActiveHouse(res[0]);
		},
		err => {
			this.logger.log(this,"Problem fetching houses: " + JSON.stringify(err));
			this.account.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem fetching houses";
		});
	}

	makeActiveHouse(house:House):void {
		this.activeHouse = house;
		this.isMarkingTab = false;
	}

	markingsClicked():void {
		this.activeHouse = new House();
		this.isMarkingTab = true;
		this.logger.log(this,"markingsClicked");
	}

	markAccount():void {
		this.logger.log(this,"Marking account==: " + this.account.id);
		let marking:AccountMarking = new AccountMarking();
		marking.account_id = this.account.id;
		marking.amount = this.account.netAmount;
		let that = this;
		this.accountService.mark(this.account.id, marking).subscribe(resp => {
			this.logger.log(this,"Successfully marked account " + this.account.id);
			Account.markedAccount.emit("Marked");
		},
		err => {
			this.logger.error(this,"Problem marking account " + this.account.id);
		});
	}
}
