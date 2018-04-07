import { Component, OnInit } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'h4r-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	private isAdmin:boolean = false;
  constructor(private logger: LoggingService
		  ,private loginService: LoginService) { }

  ngOnInit() {
	  this.isAdmin = this.loginService.isAdminUser();
  }

}
