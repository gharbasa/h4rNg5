import { Component, OnInit } from '@angular/core';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { Pagination } from '../../models/Pagination';
import { CommunityService } from '../../services/CommunityService';

@Component({
  selector: 'h4r-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent extends H4rbaseComponent {

	public errorMessage:string = "";
  constructor(private logger: LoggingService, 	
    public loginService: LoginService,
    private communityService:CommunityService
  ) { 
    super(loginService);
  }

  ngOnInit() {
		this.fetchCommunities();
	}
	
	fetchCommunities():void {
		let that = this;
		this.communityService.list().subscribe(res => {
			that.pageSettings = this.createPaginationObject(res);
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			that.pageSettings = this.createPaginationObject(null);
			this.logger.error(this,"error fetching communities, err=" + JSON.stringify(err));
		});
	}
}
