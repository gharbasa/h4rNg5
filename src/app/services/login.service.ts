import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommunityService } from './CommunityService';
import { LocalStorageService } from './LocalStorageService';

@Injectable()
export class LoginService {

	constructor(private http: HttpClient, 
				private communityService:CommunityService,
				private localStorageService: LocalStorageService) { 
		
	}
	
	private basePath = '/api/1/usersession';
	
	get() {
		return this.http.get(this.basePath);
	}

	login(payload) {
		return this.http.post(this.basePath, payload);
	}

	remove(userId) {
		return this.http.delete(this.basePath + "/" + userId);
	}

	update(payload) {
		return this.http.patch(this.basePath + '/${payload.id}.json', payload);
	}
	
	postLoginActivity() {
		this.communityService.list().subscribe(res => {
			console.log("Fetched communities");
			this.localStorageService.setItem('communities', JSON.stringify(res));
		},
		err =>{
			console.log("error in fetching communities");
		});
	}
	
}