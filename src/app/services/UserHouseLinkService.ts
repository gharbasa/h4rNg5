import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { UserHouseLink } from '../models/UserHouseLink';
import { HouseContract } from '../models/HouseContract';
import { LoginService } from '../services/login.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserHouseLinkService {
	
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/user_house_links';
	private basePath_nondmin:string = '/api/1/users/{user.id}/user_house_links';
	
	create(userHouseLink:UserHouseLink) {
		this.nullifyNonServerAttrs(userHouseLink);
		return this.http.post(this.basePath_admin, userHouseLink);
	}
	
	update(userHouseLink:UserHouseLink) {
		this.nullifyNonServerAttrs(userHouseLink);
		return this.http.put(this.basePath_admin + "/" + userHouseLink.id, userHouseLink);
	}
	
	remove(UserHouseLinkId:number) {
		return this.http.delete(this.basePath_admin + "/" + UserHouseLinkId);
	}
	
	list(community_id:number):Observable<UserHouseLink[]>  {
		let url:string = "";
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all user house links")
			url = this.basePath_admin;
			if(community_id != null)
				url = url + "?community_id=" + community_id;
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "user house links for Userid=" + userId)
			url = this.basePath_nondmin.replace("{user.id}", userId+"");
		}
		return this.http.get(url).map(res => res as UserHouseLink[] || []);
	}
	
	contracts(key:string):Observable<HouseContract[]>  {
		return this.http.get(this.basePath_admin + "/" + key + "/contracts").map(res => res as HouseContract[] || []);
	}
	
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(userHouseLink:UserHouseLink) {
		userHouseLink.errorMessage = "";
		userHouseLink.message = "";
	}
}
