import { Component, OnInit, Input } from '@angular/core';
import { HouseContractNoteService } from '../../services/HouseContractNoteService';
import { HouseContractNote } from '../../models/HouseContractNote';
import { HouseContract } from '../../models/HouseContract';
import { LoggingService, Config } from 'loggerservice';
import {Pagination} from  '../../models/Pagination';

@Component({
  selector: 'h4r-house-contract-notes',
  templateUrl: './house-contract-notes.component.html',
  styleUrls: ['./house-contract-notes.component.scss']
})
export class HouseContractNotesComponent implements OnInit {

	public pageSettings:Pagination = new Pagination(null, true,true);
	@Input() houseContract:HouseContract;
	public newHouseContractNote:HouseContractNote = new HouseContractNote();
	constructor(private houseContractNoteService: HouseContractNoteService, private logger: LoggingService) { }
	
	ngOnInit() {
	}
	
	ngOnChanges() {
		//ngAfterContentInit() {
			let that = this;
			if(this.houseContract.id == 0) return;
			this.logger.log(this,"HouseContractNotes houseContractid=" + this.houseContract.id);
			this.fetchHouseContractNotes();
	}
	
	fetchHouseContractNotes() {
		let that = this;
		this.newHouseContractNote = new HouseContractNote();
		this.houseContractNoteService.list(this.houseContract.id).subscribe(resp => {
			that.pageSettings = new Pagination(resp, true,true);
			that.newHouseContractNote.user_house_contract_id = that.houseContract.id;
			this.logger.log(this, "Number of HouseContract Notes=" +  that.pageSettings.list.length);
		},
		err => {
			this.logger.error(this, "Error fetching houseContract notes associated with the houseContract=" +  this.houseContract.id);	
		});
	}
	
	attachHouseContractNote() {
		this.logger.log(this,"Sending new pic to the server to save against the home " + this.newHouseContractNote.user_house_contract_id);
		let that = this;
		this.houseContractNoteService.add(this.newHouseContractNote).subscribe(resp => {
			that.logger.log(this,"Successfully attached the note to the houseContract " + this.newHouseContractNote.user_house_contract_id);
			that.fetchHouseContractNotes();
		}, err => {
			that.logger.error(this,"Error in saving the new note to the houseContract " + this.newHouseContractNote.user_house_contract_id);
		});
	}
	
	deleteNote(houseContractNote: HouseContractNote) {
		this.logger.log(this,"Ok, received the event to delete the note id=" + houseContractNote.id + ", houseId=" + houseContractNote.user_house_contract_id);
		let that = this;
		this.houseContractNoteService.remove(houseContractNote.id,houseContractNote.user_house_contract_id).subscribe(resp => {
			that.logger.log(this,"Successfully deleted the note ");
			that.fetchHouseContractNotes();
		}, err => {
			that.logger.error(this,"Error in deleting the note");
		});
	}
}
