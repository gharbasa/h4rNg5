import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Payment } from '../models/Payment';

@Injectable()
export class PaymentService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/payments';
	
	list() {
		return this.http.get(this.basePath);
	}

	create(payment:Payment) {
		return this.http.post(this.basePath, payment);
	}
	
	monthlyPayments(house_id:number, year:number) {
		let url:string = this.basePath + "/monthlyPayments";
		if(house_id != null)
			url = url + "?house_id=" + house_id;
		if(year != null)
			url = url + "&year=" + year
		return this.http.get(url);
	}
	/**
	 * Remove 
	 */
	remove(id:number) {
		return this.http.delete(this.basePath + "/" + id);
	}
}
