import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'h4r-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
	
	private house: any = new House();
	private editHouse:boolean = false;
	private communities:any = null;
  	constructor(private houseService: HouseService
			, private router: Router
			, private route: ActivatedRoute
			, private localStorageService: LocalStorageService) { 
  		let that = this;
  		this.communities = JSON.parse(this.localStorageService.getItem('communities'));
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				console.log("User wants to create a new house");
  				that.editHouse = false;
  				that.house.message = "";
  				that.house.errorMessage = "";
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				console.log("User wants to edit house, id=" + res.id);
  				this.houseService.get(res.id).subscribe(res => {
  					that.house = res;
  					that.house.message = "";
	  				that.house.errorMessage = "";
  				},
  				err => {
  					that.house.message = "";
	  				that.house.errorMessage = "Problem retrieving notification type.";
  				});
  			}
  		});
  	}

  	ngOnInit() {
  	}
  	
  	saveRecord() {
		if(this.house.id !== 0) {
			this.update();
		} else {
			this.create();
		}
	}
	
	create() {
		console.log("Creating a new house with subject=" + this.house.subject);
		this.houseService.create(this.house).subscribe(res => {
			console.log("house is successfully created");
			this.house.message = "Successfully created house.";
			this.router.navigate(['postupdate']);
		},
		err => {
			console.log("problem creating the house: " + JSON.stringify(err));
			this.house.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem creating the house";
		});
	}
	
	update() {
		console.log("Udpating the house id=" + this.house.id);
		this.houseService.update(this.house).subscribe(res => {
			console.log("Successfully updated");
			this.house.message = "Successfully updated the house.";
			this.router.navigate(['postupdate']);
		},
		err => {
			console.log("Problem updating the house: " + JSON.stringify(err));
			this.house.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the house";
		});
	}
	
}
