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
		  		//if(link.house != null && link.role > 0) {
		  		if(link.house != null) {
		  			that.pushUserHouseLink(link);
		  		}
		  }
		  that.logger.log(this,"User house links are successfully fetched.");
	  },
	  err => {
		  that.logger.error(this,"Error fetching User house links.");
	  });
  }
  
  /**
   * If the House entry already exists in userHouseLinks, then add the appropriate user role to it than creating a new entry
   * 
   */
  pushUserHouseLink(link) {
	  let that = this;
	  let foundLink = null;
	  this.userHouseLinks.forEach(function (userHouseLink) {
		  if(userHouseLink.house_id === link.house_id) {
			  foundLink = userHouseLink;
			  that.logger.info(that,"Hey, there is houseuserlink already in the array, lets use it.");
		  }
	  });
	  
	  if(link.land_lord == true) {
		  link.land_lord_id = link.user_id
		  link.org_land_lord_id = link.user_id
	  }
	  if(link.tenant == true) {
		  link.tenant_id = link.user_id
		  link.org_tenant_id = link.user_id
	  }
	  if(link.accountant == true) {
		  link.accountant_id = link.user_id
		  link.org_accountant_id = link.user_id
	  }
	  if(link.property_mgmt_mgr == true) {
		  link.property_mgmt_mgr_id = link.user_id
		  link.org_property_mgmt_mgr_id = link.user_id
	  }
	  if(link.property_mgmt_emp == true) {
		  link.property_mgmt_emp_id = link.user_id
		  link.org_property_mgmt_emp_id = link.user_id
	  }
	  if(link.agency_collection_emp == true) {
		  link.agency_collection_emp_id = link.user_id
		  link.org_agency_collection_emp_id = link.user_id
	  }
	  if(link.agency_collection_mgr == true) {
		  link.agency_collection_mgr_id = link.user_id
		  link.org_agency_collection_mgr_id = link.user_id
	  }
	  
	  if(foundLink == null) {
		  that.logger.info(that,"Hey, No houseuserlink in the array, pushing the entry.");
		  this.userHouseLinks.push(link);
	  } else {
		  that.logger.info(that,"Hey, lets merge the link to an existing link in the array.");
		  if(link.land_lord == true) {
			  foundLink.land_lord = true;
			  foundLink.land_lord_id = link.user_id
			  foundLink.org_land_lord_id = link.user_id
		  }
		  if(link.tenant == true) {
			  foundLink.tenant = true;
			  foundLink.tenant_id = link.user_id
			  foundLink.org_tenant_id = link.user_id
		  }
		  if(link.accountant == true) {
			  foundLink.accountant = true;
			  foundLink.accountant_id = link.user_id
			  foundLink.org_accountant_id = link.user_id
		  }
		  if(link.property_mgmt_mgr == true) {
			  foundLink.property_mgmt_mgr = true;
			  foundLink.property_mgmt_mgr_id = link.user_id
			  foundLink.org_property_mgmt_mgr_id = link.user_id
		  }
		  if(link.property_mgmt_emp == true) {
			  foundLink.property_mgmt_emp = true;
			  foundLink.property_mgmt_emp_id = link.user_id
			  foundLink.org_property_mgmt_emp_id = link.user_id
		  }
		  if(link.agency_collection_emp == true) {
			  foundLink.agency_collection_emp = true;
			  foundLink.agency_collection_emp_id = link.user_id
			  foundLink.org_agency_collection_emp_id = link.user_id
		  }
		  if(link.agency_collection_mgr == true) {
			  foundLink.agency_collection_mgr = true;
			  foundLink.agency_collection_mgr_id = link.user_id
			  foundLink.org_agency_collection_mgr_id = link.user_id
		  }
	  }
	  
  }
  
  houseUserLinkChanged(userHouseLink:any, changeType) {
	  let that = this;
	  that.logger.log(this,changeType + " changed for the house=" + userHouseLink.house.name);
	  userHouseLink.updateType=changeType;
	  that.logger.log(this,"New Payload=" + JSON.stringify(userHouseLink));
	  this.userHouseLinkService.update(userHouseLink).subscribe(resp => {
		  that.logger.log(this,changeType + " of this house '" + userHouseLink.house.name + "' is successfully changed");
		  that.refreshHouseUserLinks();
	  }
	  ,err => {
		  that.logger.error(this,"Error in changing " + changeType+ " of this house '" + userHouseLink.house.name);
	  });
  }
}
