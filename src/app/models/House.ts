export class House {
	id: number = 0;
    name:string = "";
    addr1:string = "";
    addr2:string = "";
    addr3:string = "";
    addr4:string = "";
    no_of_portions:number = 0;
    no_of_floors:number = 0;
    verified:boolean = false
    processing_fee:number = 0;
    community_id:number = null;
    active:boolean = true;
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
