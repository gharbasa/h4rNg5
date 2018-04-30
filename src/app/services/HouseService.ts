import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { House } from '../models/House';
import { LoginService } from '../services/login.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HouseService {
	
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/houses';
	private basePath_nondmin:string = '/api/1/users/{user.id}/houses';
	
	get(houseId:number):Observable<House> {
		return this.http.get(this.basePath_admin + "/" + houseId).map(res => res as House || null);
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
	
	list(community_id:number):Observable<House[]>  {
		let url:string = "";
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all houses")
			url = this.basePath_admin; 
			if(community_id != null)
				url = url + "?community_id=" + community_id;
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "houses for Userid=" + userId)
			url = this.basePath_nondmin.replace("{user.id}", userId+"");
		}
		return this.http.get(url).map(res => res as House[] || []);
	}

	list4Reports() {
		this.logger.log(this, "list4Reports")
		let path = this.basePath_admin + "/list4Reports"; 
		return this.http.get(path);
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(house:House) {
		house.images = null;
		house.errorMessage = "";
		house.message = "";
	}

	updateOpenHouseFlag(house:House) {
		let partUrl:string = "";
		if(house.is_open === true) //user wants to bring the house open
			partUrl = "/makeitOpen";
		else
			partUrl = "/makeitClosed";
		return this.http.put(this.basePath_admin + "/" + house.id + partUrl, null);
	}
	
	updateActiveFlag(house:House) {
		let partUrl:string = "";
		if(house.active === true) //user wants to activate the house
			partUrl = "/activate";
		else
			partUrl = "/inactivate";
		return this.http.put(this.basePath_admin + "/" + house.id + partUrl, null);
	}
}
