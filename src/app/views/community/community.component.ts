import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/Community';
import { CommunityService } from '../../services/CommunityService';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorageService';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';

@Component({
  selector: 'h4r-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  private community:Community = new Community();
	private editcommunity:boolean = false;
  private communities:Array<Community> = null;
  private users:Array<User> = [];
	private createNewCommunity:boolean = false;
  	constructor(private communityService: CommunityService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService
			, private logger: LoggingService
			, private loginService:LoginService) { 
  		
  	}

    ngOnInit() {
  		let that = this;
      let user = this.loginService.getCurrentUser();
      this.users = this.loginService.getUsers();
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				this.logger.log(this,"User wants to create a new community");
  				that.editcommunity = false;
  				that.community.message = "";
  				that.community.errorMessage = "";
				  that.createNewCommunity = true;
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				this.logger.log(this,"User wants to edit community, id=" + res.id);
  				this.communityService.get(res.id).subscribe(res => {
  					that.community = res;
  					that.community.message = "";
	  				that.community.errorMessage = "";
  				},
  				err => {
  					that.community.message = "";
	  				that.community.errorMessage = "Problem retrieving community.";
  				});
  			}
  		});
  	}
  	
  	saveRecord() {
		if(this.community.id !== 0) {
			this.update();
		} else {
			this.create();
		}
	}
	
	create() {
		this.logger.log(this,"Creating a new community");
		this.communityService.create(this.community).subscribe(res => {
			this.logger.log(this,"community is successfully created");
			this.community.message = "Successfully created community.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"problem creating the community: " + JSON.stringify(err));
			this.community.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage:"Problem creating the community";
		});
	}
	
	update() {
		this.logger.log(this,"Udpating the community id=" + this.community.id);
		this.communityService.update(this.community).subscribe(res => {
			this.logger.log(this,"Successfully updated");
			this.community.message = "Successfully updated the community.";
			this.router.navigate(['postupdate']);
		},
		err => {
			this.logger.log(this,"Problem updating the community: " + JSON.stringify(err));
			this.community.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the community";
		});
	}

}
