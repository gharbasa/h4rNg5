import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { Community } from '../../models/Community';
import { Account } from '../../models/Account';
import { AgmMap } from '@agm/core';
import { AccountService } from '../../services/AccountService';

@Component({
  selector: 'h4r-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
  
})
export class HouseComponent implements OnInit {
	
	public house:House = new House();
	public editHouse:boolean = false;
	public communities:Array<Community> = null;
	public accounts:Array<Account> = null;
	public createNewHouse:boolean = false;

	public latitude: number;
  	public longitude: number;
  	public zoom: number;
	public errorInMap:boolean = false;
	
	@ViewChild(AgmMap)
	public agmMap: AgmMap;


  	constructor(public houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private logger: LoggingService
			, private loginService:LoginService
			, private accountService:AccountService) { 
  		
  	}

  	ngOnInit() {
		this.zoom = 4;
		this.latitude = 39.8282;
		this.longitude = -98.5795;
		this.setCurrentPosition();
  		let that = this;
  		this.communities = this.loginService.getCommunities();
		let user = this.loginService.getCurrentUser();
		this.accountService.list().subscribe(res => {
			that.accounts = res;
		});

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
					  that.identifyHouseLocation();
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

	private setCurrentPosition() {
		let that = this;
		if ("geolocation" in navigator) {
		  navigator.geolocation.getCurrentPosition((position) => {
			that.latitude = position.coords.latitude;
			that.longitude = position.coords.longitude;
			that.zoom = 12;
			if ((that.agmMap != null) && (that.agmMap != undefined)) that.agmMap.triggerResize();
		  });
		}
	}

	private identifyHouseLocation() {
		let that = this;
		that.house.errorMessage = "";
		that.errorInMap = false;
		this.houseService.getlatlng(that.house).subscribe(res => {
			if(res.status == "OK") {
				that.latitude = res.results[0].geometry.location.lat;
				that.longitude = res.results[0].geometry.location.lng;
				that.logger.info(this, "Ok found house address, that.latitude=" + that.latitude + ", that.longitude=" + that.longitude);
				that.zoom = 12;
				that.agmMap.triggerResize();
			} else {
				that.logger.error("Unable to locate house address in google maps.");
				that.house.errorMessage = "Unable to locate house address in google maps.";
				that.errorInMap = true;
			}
		});
	}
}
