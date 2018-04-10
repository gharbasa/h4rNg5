export class HouseContract {
	id: number = 0;
	user_id:number = 0;
	house_id:number = 0;
    contract_start_date:string = "";
    contract_end_date:string = "";
    annual_rent_amount:number = 0;
	monthly_rent_amount:number = 0;
	active:boolean = false
	created_by:number = 0;
    updated_by:number = 0;
    created_at:string = "";
    updated_at:string = "";
    note:string = "";
    roles:string = "";
    
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
