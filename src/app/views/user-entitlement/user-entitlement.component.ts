import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../models/AppSettings';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { UserService } from '../../services/UserService';
import { LoggingService } from '../../../../node_modules/loggerservice';
import { LoginService } from '../../services/login.service';
import { UserHouseLinkService } from '../../services/UserHouseLinkService';
import { Router, ActivatedRoute } from '@angular/router';
import { HouseContractsService } from '../../services/HouseContractsService';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-user-entitlement',
  templateUrl: './user-entitlement.component.html',
  styleUrls: ['./user-entitlement.component.scss']
})
export class UserEntitlementComponent extends H4rbaseComponent {

  public userEntitlment = JSON.parse(JSON.stringify(AppSettings.ROLES));
  public user:User = new User();
  constructor(private userService: UserService,
              private logger: LoggingService,
              public loginService: LoginService,
              private userHouseLinkService: UserHouseLinkService,
              private router: Router,
              private houseContractsService: HouseContractsService,
              private route: ActivatedRoute) { 
        super(loginService);

    }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser():void {
    let that = this;
  		this.route.params.subscribe(res => {
        if(res.id) {//userId
          that.logger.info(this, "Fetching user:" + res.id);
          this.userService.get(res.id).subscribe(resp => {
	  				that.user = resp;
  					that.user.message = "";
	  				that.user.errorMessage = "";
            this.logger.log(this,"User details were successfully fetched");
            that.updateExistingEntitlements();
  				},
  				err => {
  					
  				});
        }
    });
  }

  saveRecord():void {
    let that = this;
    this.updateUserEntitlementNumber();
    this.userService.entitlement(this.user.id,this.user.entitlement).subscribe(resp => {
      that.user.message = "Successfully updated user entitlements!";
      that.user.errorMessage = "";
      that.logger.log(this,"User entitlement has been successfully updated.");
      this.router.navigate(['postupdate']);
    },
    err => {
      that.user.message = "";
      that.user.errorMessage = "Problem updateing entitlement of the user";
    });
  }

  updateExistingEntitlement(roleConst:string):void {
    this.userEntitlment[roleConst].entitled = ((this.user.entitlement & AppSettings.ROLES[roleConst].value) != 0);
  }

  updateExistingEntitlements():void {
    let that = this;
    AppSettings.ROLES_LIST.forEach(element => {
      that.updateExistingEntitlement(element);
    });
    this.logger.info(this, "Entitlement number=" + this.user.entitlement);
  }

  updateUserEntitlementNumber():void {
    let entitlementNumber:number = 0;
    let that = this;
    AppSettings.ROLES_LIST.forEach(element => {
      this.logger.info(this, "User entitlement " + element + ", number=" + that.userEntitlment[element].value);
      if (that.userEntitlment[element].entitled == true)
          entitlementNumber += that.userEntitlment[element].value;
    });
    this.logger.info(this, "User entitlement number = " + entitlementNumber);
    that.user.entitlement = entitlementNumber;
  }

}
