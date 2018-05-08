import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/User';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/users';
	
	get(userId:number):Observable<User> {
		return this.http.get(this.basePath + "/" + userId).map(res => res as User || null);
	}

	create(user:User) {
		this.nullifyNonServerAttrs(user);
		return this.http.post(this.basePath, user);
	}

	update(user:User) {
		this.nullifyNonServerAttrs(user);
		return this.http.put(this.basePath + "/" + user.id, user);
	}
	
	resetPasswordAdmin(userId:number) {
		return this.http.put(this.basePath + "/" + userId + "/resetPassword", "");
	}
	
	forgotPassword(user:User) {
		return this.http.put(this.basePath + "/forgotPassword", user);
	}
	
	remove(userId:number) {
		return this.http.delete(this.basePath + "/" + userId);
	}
	
	list():Observable<User[]> {
		return this.http.get(this.basePath).map(res => res as User[] || []);
	}
	
	filterByCommunity(commnunity_id:number):Observable<User[]> {
		return this.http.get(this.basePath + "?commnunity_id=" + commnunity_id).map(res => res as User[] || []);
	}
	
	promote2Admin(user:User) {
		let url = this.basePath + "/" + user.id + "/" + "promote2Admin"
		return this.http.put(url,"");
	}
	
	demoteFromAdmin(user:User) { 
		let url = this.basePath + "/" + user.id + "/" + "demoteFromAdmin"
		return this.http.put(url,"");
	}

	changeSubscription(user:User) {
		let url = this.basePath + "/" + user.id + "/" + "changeSubscription"
		return this.http.put(url,{subscriptionType: user.subscriptionType});
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
