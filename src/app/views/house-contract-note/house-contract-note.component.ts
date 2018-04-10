import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HouseContractNote } from '../../models/HouseContractNote';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-house-contract-note',
  templateUrl: './house-contract-note.component.html',
  styleUrls: ['./house-contract-note.component.scss']
})
export class HouseContractNoteComponent implements OnInit {

	@Input() houseContractNote:HouseContractNote;
	@Output() onDeleteNoteClick = new EventEmitter<HouseContractNote>();
	constructor(private logger:LoggingService) { }

	ngOnInit() {
		
	}
	
	deleteNote() {
		this.logger.log(this, "user wants to delete the note=" + this.houseContractNote.id)
		this.onDeleteNoteClick.emit(this.houseContractNote);
		return false;
	}

}
