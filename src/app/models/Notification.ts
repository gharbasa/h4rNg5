export class Notification {
	id: number = 0;
	user_id: number = 0;
	notification_type_id: number;
	retries_count:number = 0;
	active: boolean = true;
	created_by: number = 0;
	updated_by: number = 0;
	priority: number = 0;
	updated_at:string = "";
	created_at: string = "";
	
	subject:string = "";
	content:string = "";
	errorMessage:string = "";
	message:string  = "";

	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/

}