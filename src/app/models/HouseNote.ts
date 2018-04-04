export class HouseNote {
	id: number = 0;
    note:string = "";
    active:boolean = false;
    house_id: number = 0;
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