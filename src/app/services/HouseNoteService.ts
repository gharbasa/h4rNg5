import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HouseNote } from '../models/HouseNote';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class HouseNoteService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = AppSettings.H4R_BACKEND_URL + 'api/1/houses/{houseId}/notes';
	
	list(houseId:any):Observable<HouseNote[]>  {
		let path = this.basePath.replace('{houseId}', houseId);
		return this.http.get(path).map(res => res as HouseNote[] || []);
	}

	add(houseNote:HouseNote) {
		let path = this.basePath.replace('{houseId}', houseNote.house_id+"");
		return this.http.post(path, houseNote);
	}
	
	/**
	 * Remove house note
	 */
	remove(houseNoteId:number, houseId:number) {
		let path = this.basePath.replace('{houseId}', houseId+"");
		return this.http.delete(path + "/" + houseNoteId);
	}
	
	update(houseNote:HouseNote) {
		let path = this.basePath.replace('{houseId}', houseNote.house_id+"");
		return this.http.put(path + "/" + houseNote.id, houseNote);
	}
}
