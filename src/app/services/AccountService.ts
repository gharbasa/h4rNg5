import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Account } from '../models/Account';
import { AppSettings } from '../models/AppSettings';
import { House } from '../models/House';
import { AccountMarking } from '../models/AccountMarking';
import { MonthTransaction } from '../models/MonthTransaction';

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

	mark(accountId:number, payload:AccountMarking):Observable<AccountMarking> {
		return this.http.post(this.basePath + "/" + accountId + "/mark", payload)
					.map(res => res as AccountMarking || null);
	}

	markings(accountId:number):Observable<AccountMarking[]> {
		return this.http.get(this.basePath + "/" + accountId + "/markings").map(res => res as AccountMarking[] || []);
	}

	allMonthlyIncome(accountId:number, month:string, year:string):Observable<MonthTransaction[]> {
		return this.http.get(AppSettings.H4R_BACKEND_URL
					 + 'api/1/payments/allMonthlyIncome?accountId='+ accountId
					 + '&month=' + month
					 + '&year=' + year)
					.map(res => res as MonthTransaction[] || []);
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(account:Account) {
		account.errorMessage = "";
		account.message = "";
	}
}
