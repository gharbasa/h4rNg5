import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HouseNote } from '../../models/HouseNote';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-house-note',
  templateUrl: './house-note.component.html',
  styleUrls: ['./house-note.component.scss']
})
export class HouseNoteComponent implements OnInit {

	@Input() houseNote:HouseNote;
	@Output() onDeleteNoteClick = new EventEmitter<HouseNote>();
	constructor(private logger:LoggingService) { }

	ngOnInit() {
	}
	
	deleteNote() {
		this.logger.log(this, "user wants to delete the note=" + this.houseNote.id)
		this.onDeleteNoteClick.emit(this.houseNote);
		return false;
	}

}
