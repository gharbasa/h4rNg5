import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'h4r-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	private users: any;

	constructor(private userService: UserService) {
  		let that = this;
  		
  		this.userService.list().subscribe(res => {
  			that.users = res;
  			//console.log("users =" + JSON.stringify(res));
  		}, err=> {
  			console.log("users err=" + JSON.stringify(err));
  		});
  		
  	}
	
  ngOnInit() {
	  
  }

}
