import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { HouseContract } from '../models/HouseContract';

import { LoginService } from '../services/login.service';

@Injectable()
export class HouseContractsService {
	
	private sharedKey:any = null;
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/user_house_contracts';
	private basePath_nondmin:string = '/api/1/users/{user.id}/user_house_contracts';
	
	get(contractId:number) {
		return this.http.get(this.basePath_admin + "/" + contractId);
	}

	create(houseContract:HouseContract) {
		this.nullifyNonServerAttrs(houseContract);
		return this.http.post(this.basePath_admin, houseContract);
	}
	
	update(houseContract:HouseContract) {
		this.nullifyNonServerAttrs(houseContract);
		return this.http.put(this.basePath_admin + "/" + houseContract.id, houseContract);
	}

	activate(houseContract:HouseContract) {
		this.nullifyNonServerAttrs(houseContract);
		return this.http.put(this.basePath_admin + "/" + houseContract.id + "/activate", "");
	}

	deactivate(houseContract:HouseContract) {
		this.nullifyNonServerAttrs(houseContract);
		return this.http.put(this.basePath_admin + "/" + houseContract.id + "/deactivate", "");
	}
	
	list() {
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all houseContracts")
			return this.http.get(this.basePath_admin);
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "houseContracts for Userid=" + userId)
			let url:string = this.basePath_nondmin.replace("{user.id}", userId+"");
			return this.http.get(url);
		}
	}
	
	setSharedKey(sharedKey:any) {
		this.sharedKey = sharedKey;
	}

	getSharedKey() {
		return this.sharedKey;
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(houseContract:HouseContract) {
		houseContract.errorMessage = "";
		houseContract.message = "";
	}
}
