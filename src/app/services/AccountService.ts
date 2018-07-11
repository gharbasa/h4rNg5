import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Account } from '../models/Account';
import { AppSettings } from '../models/AppSettings';
import { House } from '../models/House';

@Injectable()
export class AccountService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = AppSettings.H4R_BACKEND_URL + 'api/1/accounts';
	
	get(accountId:number):Observable<Account> {
		return this.http.get(this.basePath + "/" + accountId).map(res => res as Account || null);
	}

	create(account:Account) {
		this.nullifyNonServerAttrs(account);
		return this.http.post(this.basePath, account);
	}
	
	update(account:Account) {
		this.nullifyNonServerAttrs(account);
		return this.http.put(this.basePath + "/" + account.id, account);
	}
	
	remove(accountId:number) {
		return this.http.delete(this.basePath + "/" + accountId);
	}
	
	list():Observable<Account[]>  {
		console.log("Fetching Communities");
		return this.http.get(this.basePath).map(res => res as Account[] || []);
	}
	
	houses(accountId:number):Observable<House[]> {
		return this.http.get(this.basePath + "/" + accountId + "/houses").map(res => res as House[] || []);
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(account:Account) {
		account.errorMessage = "";
		account.message = "";
	}
}