import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../models/User';

@Injectable()
export class UserService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/users';
	
	get(userId:number) {
		return this.http.get(this.basePath + "/" + userId);
	}

	create(user:User) {
		this.nullifyNonServerAttrs(user);
		return this.http.post(this.basePath, user);
	}

	update(user:User) {
		this.nullifyNonServerAttrs(user);
		return this.http.put(this.basePath + "/" + user.id, user);
	}
	
	remove(userId:number) {
		return this.http.delete(this.basePath + "/" + userId);
	}
	
	list() {
		return this.http.get(this.basePath);
	}
	
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(user:User) {
		user.image = null;
		user.errorMessage = "";
		user.message = "";
	}
}
