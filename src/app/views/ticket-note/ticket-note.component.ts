import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { TicketNote } from '../../models/TicketNote';
import { LoggingService } from 'loggerservice';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'h4r-ticket-note',
  templateUrl: './ticket-note.component.html',
  styleUrls: ['./ticket-note.component.scss']
})
export class TicketNoteComponent extends H4rbaseComponent {

  @Input() ticketNote:TicketNote;
	@Output() onDeleteNoteClick = new EventEmitter<TicketNote>();
	constructor(private logger:LoggingService, public loginService: LoginService) { 
		super(loginService);
	}

	ngOnInit() {
	}
	
	deleteNote() {
		this.logger.log(this, "user wants to delete the note=" + this.ticketNote.id)
		this.onDeleteNoteClick.emit(this.ticketNote);
		return false;
	}

	canDeleteNote():boolean {
			return (this.isAdminUser()) || (this.ticketNote.created_by == this.currentUser.id);
	}

}
