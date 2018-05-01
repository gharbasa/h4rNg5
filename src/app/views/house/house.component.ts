import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { Community } from '../../models/Community';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
  
})
export class HouseComponent implements OnInit {
	
	private house:House = new House();
	private editHouse:boolean = false;
	private communities:Array<Community> = null;
	private createNewHouse:boolean = false;
  	constructor(private houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService
			, private logger: LoggingService
			, private loginService:LoginService) { 
  		
  	}

  	ngOnInit() {
  		let that = this;
  		this.communities = this.loginService.getCommunities();//JSON.parse(this.localStorageService.getItem('communities'));
  		let user = this.loginService.getCurrentUser();
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				this.logger.log(this,"User wants to create a new house");
  				that.editHouse = false;
  				that.house.community_id = user.community_id;
  				that.house.message = "";
  				that.house.errorMessage = "";
  				that.createNewHouse = true;
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				this.logger.log(this,"User wants to edit house, id=" + res.id);
  				this.houseService.get(res.id).subscribe(res => {
  					that.house = res;
  					if(!that.house.property_mgmt_mgr) {
  						this.logger.log(this,"No Manager to this house");
  						that.house.property_mgmt_mgr = {id:0,fname:"",lname:""};
  					}
  					if(!that.house.tenant) {
  						this.logger.log(this,"No tenant to this house");
  						that.house.tenant = {id:0,fname:"",lname:""};
  					}
  					
  					that.house.message = "";
	  				that.house.errorMessage = "";
  				},
  				err => {
  					that.house.message = "";
	  				that.house.errorMessage = "Problem retrieving house.";
  				});
  			}
  		});
  	}
  	
  	saveRecord() {
		if(this.house.id !== 0) {
			this.update();
		} else {
			this.create();
		}
	}
	
	create() {
		this.logger.log(this,"Creating a new house");
		this.houseService.create(this.house).subscribe(res => {
			this.logger.log(this,"house is successfully created");
			this.house.message = "Successfully created house.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"problem creating the house: " + JSON.stringify(err));
			this.house.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem creating the house";
		});
	}
	
	update() {
		this.logger.log(this,"Udpating the house id=" + this.house.id);
		this.houseService.update(this.house).subscribe(res => {
			this.logger.log(this,"Successfully updated");
			this.house.message = "Successfully updated the house.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"Problem updating the house: " + JSON.stringify(err));
			this.house.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the house";
		});
	}
	
}
