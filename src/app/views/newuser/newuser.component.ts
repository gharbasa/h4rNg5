import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'h4r-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {
	
	public user: any = new User();
	public selfEditUserProfile:boolean = false;
  	constructor(private userService: UserService
  			, private router: Router
  			, private route: ActivatedRoute 
  			,private localStorageService: LocalStorageService) {
  		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.feature == -1) {
  				that.selfEditUserProfile = true;
  				that.user = JSON.parse(localStorageService.getItem('user'));
  				that.user.message = "";
  				that.user.errorMessage = "";
  				console.log("User wants to edit his/her profile " + that.user.id);
  			} else if(res.feature > 0) {
  				//if not -1, then it is a userId
  				this.userService.get(res.feature).subscribe(res => {
	  				that.user = res;
  					that.user.message = "";
	  				that.user.errorMessage = "";
	  				console.log("User wants to edit someother user profile, userID=" + that.user.id);
  				},
  				err => {
  					
  				});
  			}
  		});
  	}
  	
  	ngOnInit() {
  		
  	}
  	
  	saveRecord() {
  		if(this.user.id !== 0) {
  			this.update();
  		} else {
  			this.create();
  		}
  	}
  	
  	create() {
  		console.log("Creating a new user with fname=" + this.user.fname);
  		this.userService.create(this.user).subscribe(res => {
  			console.log("User is successfully created");
  			this.user.message = "Successfully created user.";
  			this.router.navigate(['postupdate']);
  		},
  		err => {
  			console.log("problem creating the user: " + JSON.stringify(err));
  			this.user.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem creating the user";
  		});
  	}
  	
  	update() {
  		console.log("Udpating the user id=" + this.user.id);
  		this.userService.update(this.user).subscribe(res => {
  			console.log("Successfully updated");
  			this.user.message = "Successfully updated the user.";
  			if(this.selfEditUserProfile === true)
  				this.localStorageService.setItem('user', JSON.stringify(res));
  			this.router.navigate(['postupdate']);
  		},
  		err => {
  			console.log("Problem updating the user: " + JSON.stringify(err));
  			this.user.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the user";
  		});
  	}

}
