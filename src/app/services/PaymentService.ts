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

	add(payment:Payment) {
		return this.http.post(this.basePath, payment);
	}
	
	/**
	 * Remove 
	 */
	remove(id:number) {
		return this.http.delete(this.basePath + "/" + id);
	}
}
