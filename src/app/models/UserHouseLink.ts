export class UserHouseLink {
	id:number = 0;
    user_id:number = 0;
    house_id: number = 0;
    role: number = 0;
    user_house_contract_id:number =  0;
    active: boolean = true;
    created_by:number = 0;
    updated_by:number = 0;
	
	user:any = null; //Json readonly
	house:any = null; //json readonly

	tenant:number = 0;
	landLord:number = 0;
	accountant:number = 0;
	property_mgmt_mgr:number = 0;
	property_mgmt_emp:number = 0;
	agency_coll_emp:number = 0;
	agency_coll_mgr:number = 0;

	errorMessage:string = "";
	message:string  = "";
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
	
}
