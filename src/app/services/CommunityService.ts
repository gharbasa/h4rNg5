import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Community } from '../models/Community';

@Injectable()
export class CommunityService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/communities';
	
	get(communityId:number) {
		return this.http.get(this.basePath + "/" + communityId);
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
	
	list() {
		return this.http.get(this.basePath);
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
