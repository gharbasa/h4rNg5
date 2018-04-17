export class Payment {
	id: number = 0;
	user_house_contract_id: number = 0;
	payment:number = 0;// "/system/house_pics/pictures/000/000/001/original/rose.jpg?1458412701",
	payment_status:number = 0;
	payment_type:number = 0;
	payment_date:string = "";
	retries_count:number = 0;
	note:string = "";
	created_by:number = 0;
	updated_by:number = 0;
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
