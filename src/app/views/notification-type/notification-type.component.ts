import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationType } from '../../models/NotificationType';
import { NotificationTypeService } from '../../services/NotificationTypeService';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'h4r-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.scss']
})
export class NotificationTypeComponent implements OnInit {

	private notificationType: any = new NotificationType();
	private editNotificationType:boolean = false;

	private config = {
        displayKey:"description", //if objects array passed which key to be displayed defaults to description,
        search:true //enables the search plugin to search in the list
    };
	
	//dropdown reference: https://github.com/manishjanky/ngx-select-dropdown/blob/master/demo/src/app/app.component.ts
	private noticeTypeOptions = [
	                         {id:1, description:"New user"},
	                         {id:2, description: "House Verified"},
	                         {id:3, description: "User house record updated"},
	                         {id:4, description: "Community verified"},
	                         {id:5, description: "Community updated"}
	];
			
	private selectedOptions:any = [];
	
	constructor(private notificationTypeService: NotificationTypeService
			, private router: Router
			, private route: ActivatedRoute 
			,private localStorageService: LocalStorageService) {
		
		let that = this;
  		this.route.params.subscribe(res => {
  			if(res.id == -1) {
  				console.log("User wants to create a new notificationType");
  				that.editNotificationType = false;
  				that.notificationType.message = "";
  				that.notificationType.errorMessage = "";
  			} else if(res.id > 0) {
  				//if not -1, then it is a id
  				console.log("User wants to edit notificationType, id=" + res.id);
  				this.notificationTypeService.get(res.id).subscribe(res => {
  					that.notificationType = res;
  					that.notificationType.message = "";
	  				that.notificationType.errorMessage = "";
  				},
  				err => {
  					that.notificationType.message = "";
	  				that.notificationType.errorMessage = "Problem retrieving notification type.";
  				});
  			}
  		});
	}
	
	ngOnInit() {
		
	}
	
	saveRecord() {
		if(this.notificationType.id !== 0) {
			this.update();
		} else {
			this.create();
		}
	}
	
	create() {
		console.log("Creating a new notificationType with subject=" + this.notificationType.subject);
		this.notificationTypeService.create(this.notificationType).subscribe(res => {
			console.log("notificationType is successfully created");
			this.notificationType.message = "Successfully created notificationType.";
			this.router.navigate(['postupdate']);
		},
		err => {
			console.log("problem creating the notificationType: " + JSON.stringify(err));
			this.notificationType.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem creating the notificationType";
		});
	}
	
	update() {
		console.log("Udpating the notificationType id=" + this.notificationType.id);
		this.notificationTypeService.update(this.notificationType).subscribe(res => {
			console.log("Successfully updated");
			this.notificationType.message = "Successfully updated the notificationType.";
			this.router.navigate(['postupdate']);
		},
		err => {
			console.log("Problem updating the notificationType: " + JSON.stringify(err));
			this.notificationType.errorMessage = (err.error && err.error.errorMessage)?err.error.errorMessage[0]:"Problem updating the notificationType";
		});
	}

}
