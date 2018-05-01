import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { HouseContract } from '../models/HouseContract';
import { Payment } from '../models/Payment';
import { LoginService } from '../services/login.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class HouseContractsService {
	
	private sharedKey:any = null;
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/user_house_contracts';
	private basePath_nondmin:string = '/api/1/users/{user.id}/user_house_contracts';
	
	get(contractId:number):Observable<HouseContract> {
		return this.http.get(this.basePath_admin + "/" + contractId).map(res => res as HouseContract || null);
	}
	
	receivedPayments(contractId:number):Observable<Payment[]>  {
		return this.http.get(this.basePath_admin + "/" + contractId + "/receivedPayments").map(res => res as Payment[] || []);
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
	
	list(community_id:number):Observable<HouseContract[]>  {
		let url = "";
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all houseContracts")
			url = this.basePath_admin;
			if(community_id != null)
				url = url + "?community_id=" + community_id;
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "houseContracts for Userid=" + userId)
			url = this.basePath_nondmin.replace("{user.id}", userId+"");
		}
		return this.http.get(url).map(res => res as HouseContract[] || []);
	}
	
	appendRoles(contract:HouseContract):void {
		contract.roles = "";
		if(contract.tenant == true) {
			contract.roles = contract.roles + AppSettings.ROLES["TENANT"].label + ", ";
		}
		if(contract.land_lord == true) {
			contract.roles = contract.roles + AppSettings.ROLES["LAND_LORD"].label + ", ";
		}
		if(contract.accountant == true) {
			contract.roles = contract.roles + AppSettings.ROLES["ACCOUNTANT"].label + ", ";
		}
		if(contract.property_mgmt_mgr == true) {
			contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_MGR"].label + ", ";
		}
		if(contract.property_mgmt_emp == true) {
			contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_EMP"].label + ", ";
		}
		if(contract.agency_collection_emp == true) {
			contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_EMP"].label + ", ";
		}
		if(contract.agency_collection_mgr == true) {
			contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_MGR"].label + ", ";
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
