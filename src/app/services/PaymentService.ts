import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Payment } from '../models/Payment';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class PaymentService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = AppSettings.H4R_BACKEND_URL + 'api/1/payments';
	
	list():Observable<Payment[]> {
		return this.http.get(this.basePath).map(res => res as Payment[] || []);
	}

	create(payment:Payment) {
		return this.http.post(this.basePath, payment);
	}
	
	monthlyIncome(house_id:number, year:number):Observable<any[]> {
		let url:string = this.basePath + "/monthlyIncome";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		if(year != null)
			url = url + "&year=" + year
		return this.http.get(url).map(res => res as any[] || []);
	}

	monthlyExpenses(house_id:number, year:number):Observable<any[]> {
		let url:string = this.basePath + "/monthlyExpense";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		if(year != null)
			url = url + "&year=" + year
		return this.http.get(url).map(res => res as any[] || []);
	}

	yearlyIncome(house_id:number):Observable<any[]> {
		let url:string = this.basePath + "/yearlyIncome";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		return this.http.get(url).map(res => res as any[] || []);
	}

	yearlyExpense(house_id:number):Observable<any[]> {
		let url:string = this.basePath + "/yearlyExpense";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		return this.http.get(url).map(res => res as any[] || []);
	}

	/**
	 * Remove 
	 */
	remove(id:number) {
		return this.http.delete(this.basePath + "/" + id);
	}
}
