import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { UserHouseLink } from '../models/UserHouseLink';
import { LoginService } from '../services/login.service';

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
	
	list() {
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all user house links")
			return this.http.get(this.basePath_admin);
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "user house links for Userid=" + userId)
			let url:string = this.basePath_nondmin.replace("{user.id}", userId+"");
			return this.http.get(url);
		}
	}
	
	contracts(key:string) {
		return this.http.get(this.basePath_admin + "/" + key + "/contracts");
	}
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(userHouseLink:UserHouseLink) {
		userHouseLink.errorMessage = "";
		userHouseLink.message = "";
	}
}
