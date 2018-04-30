import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Payment } from '../models/Payment';

@Injectable()
export class PaymentService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/payments';
	
	list():Observable<Payment[]> {
		return this.http.get(this.basePath).map(res => res as Payment[] || []);
	}

	create(payment:Payment) {
		return this.http.post(this.basePath, payment);
	}
	
	monthlyPayments(house_id:number, year:number):Observable<any[]> {
		let url:string = this.basePath + "/monthlyPayments";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		if(year != null)
			url = url + "&year=" + year
		return this.http.get(url).map(res => res as any[] || []);
	}

	yearlyPayments(house_id:number):Observable<any[]> {
		let url:string = this.basePath + "/yearlyPayments";
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
