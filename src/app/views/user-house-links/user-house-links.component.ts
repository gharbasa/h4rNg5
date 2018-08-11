import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/UserService';
import { LoginService } from '../../services/login.service';
import { HouseContractsService } from '../../services/HouseContractsService';
import { UserHouseLinkService } from '../../services/UserHouseLinkService';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../../models/AppSettings';
import { UserHouseLink } from '../../models/UserHouseLink';
import { User } from '../../models/User';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { UserHouseContractSharedKey } from '../../models/UserHouseContractSharedKey';

@Component({
  selector: 'h4r-user-house-links',
  templateUrl: './user-house-links.component.html',
  styleUrls: ['./user-house-links.component.scss']
})
export class UserHouseLinksComponent extends H4rbaseComponent {
	private activePng:any = require("assets/img/active.png");
	private inactivePng:any = require("assets/img/inactive.png"); 
	private newcontractPng:any = require("assets/img/new_contract.png");
	//private userHouseLinks:Array<UserHouseLink> = [];
	public staticRoles:any = [];
	private users:Array<User> = [];
	public errorMessage:string = "";
	private message:string = "";

  	constructor(private userService: UserService,
  			private logger: LoggingService,
			public loginService: LoginService,
			private userHouseLinkService: UserHouseLinkService,
			private router: Router,
			private houseContractsService: HouseContractsService) { 
				super(loginService);
	  
  	}

	ngOnInit() {
		this.refreshHouseUserLinks();
  	}
  
  refreshHouseUserLinks() {
	  let that = this;
	  this.setEmptyMessage();
	  this.staticRoles = AppSettings.ROLES;
	  this.users = this.loginService.getUsers();
	  //that.userHouseLinks.length = 0;
	  let userHouseLinks:Array<UserHouseLink> = [];
	  this.userHouseLinkService.list(this.community_id).subscribe(resp => {
		  for(var i in resp) {
			  	let link:any = resp[i];
		  		//if(link.house != null && link.role > 0) {
		  		if(link.house != null) {
		  			that.pushUserHouseLink(userHouseLinks, link);
		  		}
		  }
		  that.logger.log(this,"User house links are successfully fetched.");
		  //Can we find the contracts based on user+house+role?
		  userHouseLinks.forEach(function (userHouseLink) {
		  	that.fetchContracts(userHouseLink);
		  });
		  that.pageSettings = this.createPaginationObject(userHouseLinks);
	  },
	  err => {
		  that.logger.error(this,"Error fetching User house links.");
	  });
  }
  
  /**
   * If the House entry already exists in userHouseLinks, then add the appropriate user role to it than creating a new entry
   * 
   */
  pushUserHouseLink(userHouseLinks:Array<UserHouseLink>, link:UserHouseLink) {
	  let that = this;
	  let foundLink = null;
	  userHouseLinks.forEach(function (userHouseLink) {
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
	  if(link.maintenance == true) {
		link.maintenance_id = link.user_id //will introduce emp.id later if needed
		link.org_maintenance_id = link.user_id
	  }
	  
	  if(foundLink == null) {
		  that.logger.info(that,"Hey, No houseuserlink in the array, pushing the entry.");
		  userHouseLinks.push(link);
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
		  if(link.maintenance == true) {
			foundLink.maintenance = true;
			foundLink.maintenance_id = link.user_id
			foundLink.org_maintenance_id = link.user_id
		}
	  }
  }

  fetchContracts(userHouseLink:UserHouseLink) {
  	let that = this;
  	if((AppSettings.ROLES['TENANT'].accessible) && (userHouseLink.tenant === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.tenant_id + "_" + AppSettings.ROLES["TENANT"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_TENANTRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for tenant key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.tenant_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.tenant_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching tenant house contract");
		});
	} else {
		that.logger.info(that, "Tenants are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['ACCOUNTANT'].accessible) && (userHouseLink.accountant === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.accountant_id + "_" + AppSettings.ROLES["ACCOUNTANT"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_ACCOUNTANTRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for accountant key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.accountant_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.accountant_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching accountant house contract");
		});
	} else {
		that.logger.info(that, "ACCOUNTANT are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['LAND_LORD'].accessible) && (userHouseLink.land_lord === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.land_lord_id + "_" + AppSettings.ROLES["LAND_LORD"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_LAND_LORDRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for land_lord key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.land_lord_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.land_lord_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching land_lord house contract");
		});
	} else {
		that.logger.info(that, "LAND_LORD are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['PROPERTY_MGMT_MGR'].accessible) && (userHouseLink.property_mgmt_mgr === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.property_mgmt_mgr_id + "_" + AppSettings.ROLES["PROPERTY_MGMT_MGR"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_PROPERTY_MGMT_MGRRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for property_mgmt_mgr key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.property_mgmt_mgr_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.property_mgmt_mgr_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching property_mgmt_mgr house contract");
		});
	} else {
		that.logger.info(that, "PROPERTY_MGMT_MGR are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['PROPERTY_MGMT_EMP'].accessible) && (userHouseLink.property_mgmt_emp === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.property_mgmt_emp_id + "_" + AppSettings.ROLES["PROPERTY_MGMT_EMP"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_PROPERTY_MGMT_EMPRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for property_mgmt_emp key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.property_mgmt_emp_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.property_mgmt_emp_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching property_mgmt_emp house contract");
		});
	} else {
		that.logger.info(that, "PROPERTY_MGMT_EMP are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['AGENCY_COLLECTION_MGR'].accessible) && (userHouseLink.agency_collection_mgr === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.agency_collection_mgr_id + "_" + AppSettings.ROLES["AGENCY_COLLECTION_MGR"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_AGENCY_COLLECTION_MGRRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for agency_collection_mgr key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.agency_collection_mgr_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.agency_collection_mgr_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching agency_collection_mgr house contract");
		});
	} else {
		that.logger.info(that, "AGENCY_COLLECTION_MGR are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['AGENCY_COLLECTION_EMP'].accessible) && (userHouseLink.agency_collection_emp === true)) {
  		let key:string = userHouseLink.house_id + "_" + userHouseLink.agency_collection_emp_id + "_" + AppSettings.ROLES["AGENCY_COLLECTION_EMP"].value;
  		that.logger.info(that,"Lets find the contracts associated with house_user_AGENCY_COLLECTION_EMPRole key=" + key);
  		that.userHouseLinkService.contracts(key).subscribe(resp => {
			if(resp && resp.length > 0) {
				that.logger.info(that, "There is a contract for agency_collection_emp key=" + key);
				var active_contracts = resp.filter(contract => (contract.active == true));
				var inactive_contracts = resp.filter(contract => (contract.active == false));
				userHouseLink.agency_collection_emp_active_contract = active_contracts.length > 0?active_contracts[0]:null;
				userHouseLink.agency_collection_emp_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
			}
		},
		err => {
			that.logger.info(that, "There is a problem in fetching agency_collection_emp house contract");
		});
	} else {
		that.logger.info(that, "AGENCY_COLLECTION_EMP are not accessible over UI. No need to fetch these contracts");
	}

	if((AppSettings.ROLES['MAINTENANCE'].accessible) && (userHouseLink.maintenance === true)) {
		let key:string = userHouseLink.house_id + "_" + userHouseLink.maintenance_id + "_" + AppSettings.ROLES["MAINTENANCE"].value;
		that.logger.info(that,"Lets find the contracts associated with house_user_MAINTENANCERole key=" + key);
		that.userHouseLinkService.contracts(key).subscribe(resp => {
		  if(resp && resp.length > 0) {
			  that.logger.info(that, "There is a contract for maintenance_mgr key=" + key);
			  var active_contracts = resp.filter(contract => (contract.active == true));
			  var inactive_contracts = resp.filter(contract => (contract.active == false));
			  userHouseLink.maintenance_active_contract = active_contracts.length > 0?active_contracts[0]:null;
			  userHouseLink.maintenance_inactive_contracts = inactive_contracts.length > 0?inactive_contracts:null;
		  }
	  },
	  err => {
		  that.logger.info(that, "There is a problem in fetching agency_collection_emp house contract");
	  });
  	} else {
		that.logger.info(that, "MAINTENANCE are not accessible over UI. No need to fetch these contracts");
	}

  }
  
  houseUserLinkChanged(userHouseLink:UserHouseLink, changeType:string) {
	  let that = this;
	  that.logger.log(this,changeType + " changed for the house=" + userHouseLink.house.name);
	  userHouseLink.updateType=changeType;
	  this.setEmptyMessage();
	  that.logger.log(this,"New Payload=" + JSON.stringify(userHouseLink));
	  this.userHouseLinkService.update(userHouseLink).subscribe(resp => {
		  that.logger.log(this,changeType + " of this house '" + userHouseLink.house.name + "' is successfully changed");
		  that.refreshHouseUserLinks();
	  }
	  ,err => {
		  that.logger.error(this,"Error in changing " + changeType+ " of this house " + userHouseLink.house.name);
		  that.errorMessage = err.error.errorMessage;
	  });
  }

  /**
  	contract_id is valid when renew:true
  */
  createContract(userHouseLink:UserHouseLink, hasRole:boolean, userId:number, role:string, renew:boolean, contract_id:number) {
  	
	if(renew == true) 
		this.logger.log(this, "User wants to renew contract " + JSON.stringify(userHouseLink));
	else 
		this.logger.log(this, "User wants to create contract " + JSON.stringify(userHouseLink));

  	if(hasRole) {
  		this.logger.log(this, "Ok, data values are correct");
  	} else {
  		this.logger.log(this, "Not a valid user.");	
  		this.errorMessage = "Warning:Choose a user.";
  		return false;
  	}

	var userName = this.loginService.getUserName(userId);
	let sharedKey:UserHouseContractSharedKey = new UserHouseContractSharedKey();
	sharedKey.house = userHouseLink.house;
	sharedKey.id = contract_id;
	sharedKey.role = role;
	sharedKey.creationType = (renew == true)?AppSettings.CONTRACT_CREATION_TYPES["RENEW"]:AppSettings.CONTRACT_CREATION_TYPES["NEW"];
	sharedKey.user_house_link_id = userHouseLink.id;
	sharedKey.user = {id: userId, fullName: userName};
	this.logger.log(this, "User wants to create contract " + JSON.stringify(sharedKey));
	return this.launchNewContractWithSharedKey(this.router, this.houseContractsService, sharedKey);
  }

  setEmptyMessage() {
	this.errorMessage = "";
	this.message = "";
  }
}
