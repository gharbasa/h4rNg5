import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Community } from '../models/Community';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class CommunityService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = AppSettings.H4R_BACKEND_URL + 'api/1/communities';
	
	get(communityId:number):Observable<Community> {
		return this.http.get(this.basePath + "/" + communityId).map(res => res as Community || null);
	}

	create(community:Community) {
		this.nullifyNonServerAttrs(community);
		return this.http.post(this.basePath, community);
	}
	
	update(community:Community) {
		this.nullifyNonServerAttrs(community);
		return this.http.put(this.basePath + "/" + community.id, community);
	}
	
	remove(communityId:number) {
		return this.http.delete(this.basePath + "/" + communityId);
	}
	
	list():Observable<Community[]>  {
		console.log("Fetching Communities");
		return this.http.get(this.basePath).map(res => res as Community[] || []);
	}
	
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(community:Community) {
		community.images = null;
		community.errorMessage = "";
		community.message = "";
	}
}
