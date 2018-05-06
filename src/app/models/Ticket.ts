
export class Ticket {
	id: number = 0;
    subject:string = "";
    description:string = "";
    status:number = 1;
    active:boolean = true;
    created_by:number = 0;
    updated_by:number = 0;
    created_at:string = "";
    updated_at:string = "";
	notesCount:number = 0;
	errorMessage:string = "";
	message:string  = "";
	images:any = [];
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
}
