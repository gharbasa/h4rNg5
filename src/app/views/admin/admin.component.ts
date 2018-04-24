import { Component, OnInit } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import {H4rbaseComponent} from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends H4rbaseComponent {

  constructor(private logger: LoggingService
		  ,public loginService: LoginService) { 
        super(loginService);
  }

  ngOnInit() {
	  
  }

}
