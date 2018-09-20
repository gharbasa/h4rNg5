import { EventEmitter } from "@angular/core";

export class Account {
	public static markedAccount:EventEmitter<string> = new EventEmitter;
	id: number = 0;
	note:string = "";
	baseline_amt:number = 0;
	baseline_date:string = "";
	baselineDate:string = ""; //view only, returned from server
	active:boolean = true;
	unitsCount:number = 0;
	created_by:number = 0;
	createdBy:any;
	updated_by:number = 0;
	created_at:string = "";
	updated_at:string = "";
	description:string = "";
	netAmount:number = 0; //readonly
	errorMessage:string = "";
	message:string  = "";
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
	constructor() {
		
	}
}
