export class HousePic {
	id: number = 0;
	house_id: number = 0;
	picture:any = "";// "/system/house_pics/pictures/000/000/001/original/rose.jpg?1458412701",
	about_pic:string = "";
	primary_pic:boolean = false;
	created_by:number = 0;
	updated_by:number = 0;
	created_at:string = "";
	updated_at:string = "";
	

	errorMessage:string = "";
	message:string  = "";
	image:string = "";
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
}
