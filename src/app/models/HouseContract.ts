export class HouseContract {
	id: number = 0;
	user_id:number = 0;
	house_id:number = 0;
    contract_start_date:string = "";
    contract_end_date:string = "";
    annual_rent_amount:number = 0;
	monthly_rent_amount:number = 0;
	user_house_link_id:number = 0;
	active:boolean = false;
	isRenewable:boolean = false; //If (now - contract_end_date) < 3
	next_contract_id:number = 0;
	from_contract_id:number = 0;// This atribute is used by the backend controller only, not mapped to the schema/model in the backend,
	renew:boolean; //This flag is sent by the view to the server. To renew this contract.
	created_by:number = 0;
    updated_by:number = 0;
    created_at:string = "";
    updated_at:string = "";
    note:string = "";
    roles:string = "";
    role:number = 0;
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
	user:any =  {"fullName": ""};
    house:any = {"name": ""};

    errorMessage:string = "";
	message:string  = "";
}
