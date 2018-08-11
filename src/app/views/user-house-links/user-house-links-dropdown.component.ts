import { Component, Input } from "@angular/core";
import { H4rbaseComponent } from "../h4rbase/h4rbase.component";
import { UserHouseLink } from "../../models/UserHouseLink";
import { HouseContract } from "../../models/HouseContract";
import { UserService } from "../../services/UserService";
import { LoggingService } from "../../../../node_modules/loggerservice";
import { LoginService } from "../../services/login.service";
import { UserHouseLinkService } from "../../services/UserHouseLinkService";
import { Router } from "../../../../node_modules/@angular/router";
import { HouseContractsService } from "../../services/HouseContractsService";
import { UserHouseContractSharedKey } from "../../models/UserHouseContractSharedKey";
import { AppSettings } from "../../models/AppSettings";

@Component({
    selector: 'h4r-user-house-links-dropdown',
    templateUrl: './user-house-links-dropdown.html',
    styleUrls: ['./user-house-links.component.scss']
  })
export class UserHouseLinksDropdownComponent extends H4rbaseComponent {
    @Input() userHouseLink:UserHouseLink;
    @Input() activeContract:HouseContract;
    @Input() inactiveContracts:Array<HouseContract>;
    @Input() userId:number; //user associated with this contract
    @Input() hasRole:boolean;
    @Input() role:string;

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
  //this.refreshHouseUserLinks();
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

}