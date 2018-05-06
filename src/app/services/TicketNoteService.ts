import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TicketNote } from '../models/TicketNote';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketNoteService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = 'api/1/tickets/{ticketId}/notes';
	
	list(ticketId:any):Observable<TicketNote[]>  {
		let path = this.basePath.replace('{ticketId}', ticketId);
		return this.http.get(path).map(res => res as TicketNote[] || []);
	}

	add(ticketNote:TicketNote) {
		let path = this.basePath.replace('{ticketId}', ticketNote.ticket_id+"");
		return this.http.post(path, ticketNote);
	}
	
	/**
	 * Remove house note
	 */
	remove(ticketNoteId:number, ticketId:number) {
		let path = this.basePath.replace('{ticketId}', ticketId+"");
		return this.http.delete(path + "/" + ticketNoteId);
	}
	
	update(ticketNote:TicketNote) {
		let path = this.basePath.replace('{houseId}', ticketNote.ticket_id+"");
		return this.http.put(path + "/" + ticketNote.id, ticketNote);
	}
}
