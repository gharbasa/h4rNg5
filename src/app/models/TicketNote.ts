export class TicketNote {
    id: number = 0;
    ticket_id:number = 0;
    note:string = "";
    active:boolean = false;
	private_note:boolean = false;
    created_by:number = 0;
    updated_by: number = 0;
    created_at:string = "";
    updated_at:string = "";

	errorMessage:string = "";
	message:string  = "";
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
}