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
	no_of_bedrooms:number = 0;
	no_of_bathrooms:number = 0;
	floor_number:number = 0;
    community_id:number = null;
    active:boolean = true;
    created_by:number = 0;
    updated_by:number = 0;
    created_at:string = "";
    updated_at:string = "";
	description:string = "";
	is_open:boolean = false;
	land_lord:any = {};
	guest:any = {};
	tenant:any =  {};
	accountant:any =  {};
	property_mgmt_mgr:any = {};
	property_mgmt_emp:any = {};
	agency_collection_emp:any = {};
	agency_collection_mgr:any = {};
	no_of_pics:number = 0;
	errorMessage:string = "";
	message:string  = "";
	images:any = [];
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
}
