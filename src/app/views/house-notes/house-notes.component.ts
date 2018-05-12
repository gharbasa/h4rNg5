import { Component, OnInit, Input } from '@angular/core';
import { HouseNoteService } from '../../services/HouseNoteService';
import { HouseNote } from '../../models/HouseNote';
import { LoggingService, Config } from 'loggerservice';
import {Pagination} from  '../../models/Pagination';
import { House } from '../../models/House';
import { HouseService } from '../../services/HouseService';

@Component({
  selector: 'h4r-house-notes',
  templateUrl: './house-notes.component.html',
  styleUrls: ['./house-notes.component.scss']
})
export class HouseNotesComponent implements OnInit {

	public pageSettings:Pagination = new Pagination(null);
	@Input() house:House;
	public newHouseNote:HouseNote = new HouseNote();
	constructor(private houseNoteService: HouseNoteService
				, private logger: LoggingService
				, public houseService:HouseService) { }
	
	ngOnInit() {
		
	}
	
	ngOnChanges() {
		//ngAfterContentInit() {
			let that = this;
			if(this.house.id == 0) return;
			this.logger.log(this,"HouseNotes houseid=" + this.house.id);
			this.fetchHouseNotes();
	}
	
	fetchHouseNotes() {
		let that = this;
		this.newHouseNote = new HouseNote();
		this.houseNoteService.list(this.house.id).subscribe(resp => {
			that.pageSettings = new Pagination(resp); //We have to build a new instance of pagination, existing instance will not refresh the view.
			that.newHouseNote.house_id = that.house.id;
			this.logger.log(this, "Number of House Notes=" +  that.pageSettings.list.length);
		},
		err => {
			this.logger.log(this, "Error fetching house notes associated with the house=" +  this.house.id);	
		});
	}
	
	attachHouseNote() {
		this.logger.log(this,"Sending new pic to the server to save against the home " + this.newHouseNote.house_id);
		let that = this;
		this.houseNoteService.add(this.newHouseNote).subscribe(resp => {
			that.logger.log(this,"Successfully attached the note to the house " + this.newHouseNote.house_id);
			that.fetchHouseNotes();
		}, err => {
			that.logger.error(this,"Error in saving the new note to the house " + this.newHouseNote.house_id);
		});
	}
	
	deleteNote(houseNote: HouseNote) {
		this.logger.log(this,"Ok, received the event to delete the note id=" + houseNote.id + ", houseId=" + houseNote.house_id);
		let that = this;
		this.houseNoteService.remove(houseNote.id,houseNote.house_id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the note ");
			that.fetchHouseNotes();
		}, err => {
			that.logger.error(this,"Error in deleting the note");
		});
	}
}
