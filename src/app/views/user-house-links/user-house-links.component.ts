import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { LoginService } from '../../services/login.service';
import { UserHouseLinkService } from '../../services/UserHouseLinkService';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import { UserHouseLink } from '../../models/UserHouseLink';

@Component({
  selector: 'h4r-user-house-links',
  templateUrl: './user-house-links.component.html',
  styleUrls: ['./user-house-links.component.scss']
})
export class UserHouseLinksComponent implements OnInit {

	private userHouseLinks: any = [];
	private staticRoles:any = [];
	private users:any = [];
  	constructor(private userService: UserService,
  			private logger: LoggingService,
			private loginService: LoginService,
			private userHouseLinkService: UserHouseLinkService) { 
	  
  	}

  ngOnInit() {
	  this.refreshHouseUserLinks();
  }
  
  refreshHouseUserLinks() {
	  let that = this;
	  this.staticRoles = AppSettings.ROLES;
	  this.users = this.loginService.getUsers();
	  that.userHouseLinks.length = 0;
	  this.userHouseLinkService.list().subscribe(resp => {
		  for(var i in resp) {
			  	let link:any = resp[i];
		  		if(link.house != null && link.role > 0) {
		  			if(link.land_lord == true) {
		  				link.landLord_id = link.user_id 
		  			}
		  			if(link.tenant == true) {
		  				link.tenant_id = link.user_id 
		  			}
		  			if(link.accountant == true) {
		  				link.accountant_id = link.user_id 
		  			}
		  			if(link.property_mgmt_mgr == true) {
		  				link.property_mgmt_mgr_id = link.user_id 
		  			}
		  			if(link.property_mgmt_emp == true) {
		  				link.property_mgmt_emp_id = link.user_id 
		  			}
		  			if(link.agency_collection_emp == true) {
		  				link.agency_collection_emp_id = link.user_id 
		  			}
		  			if(link.agency_collection_mgr == true) {
		  				link.agency_collection_mgr_id = link.user_id 
		  			}
		  			that.userHouseLinks.push(link);
		  		}
		  }
		  
		  that.logger.log(this,"User house links are successfully fetched.");
	  },
	  err => {
		  that.logger.error(this,"Error fetching User house links.");
	  });
  }
  
  agencyEmpChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"agencyEmpChanged changed for the house=" + userHouseLink.house.name);
  }
  
  agencyMgrChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"agencyMgrChanged changed for the house=" + userHouseLink.house.name);
  }
  
  propertyEmpChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"propertyEmpChanged changed for the house=" + userHouseLink.house.name);
  }
  
  propertyMgrChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"propertyMgrChanged changed for the house=" + userHouseLink.house.name);
  }
  
  accountantChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"accountantChanged changed for the house=" + userHouseLink.house.name);
  }
  
  landLordChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"landLordChanged changed for the house=" + userHouseLink.house.name);
	  that.logger.log(this,"New Payload=" + JSON.stringify(userHouseLink));
	  userHouseLink.updateType="landLord";
	  this.userHouseLinkService.update(userHouseLink).subscribe(resp => {
		  that.logger.log(this,"Landlord of this house '" + userHouseLink.house.name + "' is successfully changed");
		  //refresh the list model?
		  that.refreshHouseUserLinks();
	  }
	  ,err => {
		  that.logger.error(this,"Error in changing Landlord of this house '" + userHouseLink.house.name);
	  });
	  
  }
  
  tenantChanged(userHouseLink:any) {
	  let that = this;
	  that.logger.log(this,"tenantChanged changed for the house=" + userHouseLink.house.name);
  }
}
