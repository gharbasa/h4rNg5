export class Community {
	id: number = 0;
	name:string = "";
	addr1:string = "";
	addr2:string = "";
	addr3:string = "";
	addr4:string = "";
	processing_fee:number = 0;
	verified:boolean = false;
	active:boolean = true;
	manager_id:number = 0;
	created_by:number = 0;
	updated_by:number = 0;
	created_at:string = "";
	updated_at:string = "";
	
	errorMessage:string = "";
	message:string  = "";
	images:any = [];
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
}
