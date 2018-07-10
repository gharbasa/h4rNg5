import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { Ticket } from '../models/Ticket';
import { LoginService } from '../services/login.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class TicketService {
	
	constructor(private http: HttpClient, private logger: LoggingService) { }
	private basePath:string = AppSettings.H4R_BACKEND_URL + 'api/1/tickets';
	private searchKeyword:string = "";
	private view:string = "";
	get(ticketId:number):Observable<Ticket> {
		return this.http.get(this.basePath + "/" + ticketId).map(res => res as Ticket || null);
	}

	create(ticket:Ticket) {
		this.nullifyNonServerAttrs(ticket);
		return this.http.post(this.basePath, ticket);
	}
	
	update(ticket:Ticket) {
		this.nullifyNonServerAttrs(ticket);
		return this.http.put(this.basePath + "/" + ticket.id, ticket);
	}
	
	remove(ticketId:number) {
		return this.http.delete(this.basePath + "/" + ticketId);
	}
	
	list(status:number):Observable<Ticket[]>  {
		return this.http.get(this.basePath + "?status=" + status).map(res => res as Ticket[] || []);
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(ticket:Ticket) {
		ticket.images = null;
		ticket.errorMessage = "";
		ticket.message = "";
	}
	
}
