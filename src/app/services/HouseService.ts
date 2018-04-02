import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { House } from '../models/House';

@Injectable()
export class HouseService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/houses';
	
	get(houseId:number) {
		return this.http.get(this.basePath + "/" + houseId);
	}

	create(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.post(this.basePath, house);
	}
	
	update(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.put(this.basePath + "/" + house.id, house);
	}
	
	remove(houseId:number) {
		return this.http.delete(this.basePath + "/" + houseId);
	}
	
	list() {
		return this.http.get(this.basePath);
	}
	
	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(house:House) {
		house.images = null;
		house.errorMessage = "";
		house.message = "";
	}
}
