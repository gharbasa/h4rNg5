import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { House } from '../models/House';

import { LoginService } from '../services/login.service';

@Injectable()
export class HouseService {
	
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/houses';
	private basePath_nondmin:string = '/api/1/users/{user.id}/houses';
	
	get(houseId:number) {
		return this.http.get(this.basePath_admin + "/" + houseId);
	}

	create(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.post(this.basePath_admin, house);
	}
	
	update(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.put(this.basePath_admin + "/" + house.id, house);
	}
	
	remove(houseId:number) {
		return this.http.delete(this.basePath_admin + "/" + houseId);
	}
	
	list() {
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all houses")
			return this.http.get(this.basePath_admin);
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "houses for Userid=" + userId)
			let url:string = this.basePath_nondmin.replace("{user.id}", userId+"");
			return this.http.get(url);
		}
	}
	
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(house:House) {
		house.images = null;
		house.errorMessage = "";
		house.message = "";
	}
}
