import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { HouseContractNote } from '../models/HouseContractNote';

@Injectable()
export class HouseContractNoteService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = 'api/1/user_house_contracts/{user_house_contract_id}/notes';
	
	list(id:any) {
		let path = this.basePath.replace('{user_house_contract_id}', id);
		return this.http.get(path);
	}

	add(houseContractNote:HouseContractNote) {
		let path = this.basePath.replace('{user_house_contract_id}', houseContractNote.user_house_contract_id+"");
		return this.http.post(path, houseContractNote);
	}
	
	/**
	 * Remove house note
	 */
	remove(houseContractNoteId:number, id:number) {
		let path = this.basePath.replace('{user_house_contract_id}', id+"");
		return this.http.delete(path + "/" + houseContractNoteId);
	}
	
	update(houseContractNote:HouseContractNote) {
		let path = this.basePath.replace('{user_house_contract_id}', houseContractNote.user_house_contract_id+"");
		return this.http.put(path + "/" + houseContractNote.id, houseContractNote);
	}
}
