import { Component, OnInit } from '@angular/core';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { HouseService } from '../../services/HouseService';
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

	public pageSettings:Pagination = new Pagination(null);
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
			that.pageSettings = new Pagination(res); //We have to build a new instance of pagination, existing instance will not refresh the view.
			//this.logger.log(this,"notificationTypes =" + JSON.stringify(res));
		}, err=> {
			that.pageSettings = new Pagination(null);
			this.logger.error(this,"error fetching communities, err=" + JSON.stringify(err));
		});
	}
}
