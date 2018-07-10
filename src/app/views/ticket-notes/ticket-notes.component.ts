import { Component, OnInit, Input } from '@angular/core';
import { Pagination } from '../../models/Pagination';
import { TicketNote } from '../../models/TicketNote';
import { TicketNoteService } from '../../services/TicketNoteService';
import { TicketService } from '../../services/TicketService';
import { Ticket } from '../../models/Ticket';
import { LoggingService } from 'loggerservice';
import { LoginService } from '../../services/login.service';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';

@Component({
  selector: 'h4r-ticket-notes',
  templateUrl: './ticket-notes.component.html',
  styleUrls: ['./ticket-notes.component.scss']
})
export class TicketNotesComponent extends H4rbaseComponent {

	@Input() ticket:Ticket;
	public isadminUser:boolean = false;
	public newTicketNote:TicketNote = new TicketNote();
	constructor(private ticketNoteService: TicketNoteService
				, private logger: LoggingService
				, private ticketService:TicketService
				, public loginService: LoginService) { 
					super(loginService);
				}
	
	ngOnInit() {
		
	}
	
	ngOnChanges() {
		//ngAfterContentInit() {
			let that = this;
			if(this.ticket.id == 0) return;
			this.logger.log(this,"TicketNotes ticketid=" + this.ticket.id);
			this.fetchTicketNotes();
			this.isadminUser = this.isAdminUser();
	}
	
	fetchTicketNotes() {
		let that = this;
		this.newTicketNote = new TicketNote();
		this.ticketNoteService.list(this.ticket.id).subscribe(resp => {
			that.pageSettings = this.createPaginationObject(resp);
			that.newTicketNote.ticket_id = that.ticket.id;
			this.logger.log(this, "Number of Ticket Notes=" +  that.pageSettings.list.length);
		},
		err => {
			this.logger.log(this, "Error fetching ticket notes associated with the ticket=" +  this.ticket.id);	
		});
	}
	
	attachTicketNote() {
		this.logger.log(this,"Sending new pic to the server to save against the home " + this.newTicketNote.ticket_id);
		let that = this;
		this.ticketNoteService.add(this.newTicketNote).subscribe(resp => {
			that.logger.log(this,"Successfully attached the note to the ticket " + this.newTicketNote.ticket_id);
			that.fetchTicketNotes();
		}, err => {
			that.logger.error(this,"Error in saving the new note to the ticket " + this.newTicketNote.ticket_id);
		});
	}
	
	deleteNote(ticketNote: TicketNote) {
		this.logger.log(this,"Ok, received the event to delete the note id=" + ticketNote.id + ", ticketId=" + ticketNote.ticket_id);
		let that = this;
		this.ticketNoteService.remove(ticketNote.id,ticketNote.ticket_id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the note ");
			that.fetchTicketNotes();
		}, err => {
			that.logger.error(this,"Error in deleting the note");
		});
	}

}
