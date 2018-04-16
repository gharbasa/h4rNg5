
export class User {
	id: number = 0;
    email: string = ""; //used in self service password reset also
    fname: string = "";
    mname: string = "";
    lname: string = "";
    verified: boolean = false;
    adhaar_no: string = ""; //used in self service password reset also
    created_by: number = 0;
    updated_by: number = 0;
    avatar: string = "";
	password: string = ""; //used in self service password reset also
	password_confirmation: string = ""; //used in self service password reset also
    login: string = ""; //used in self service password reset also
    phone1: string = "";
    addr1: string = "";
    addr2: string = "";
    addr3: string = "";
    addr4: string = "";
    role: number = 0;
    admin: boolean = false;
    guest: boolean = false;
    
	promote2Admin:boolean = false;
	roleStr: string = ""; 
	sexStr:string = "";
	sex:number = "";  //used in self service password reset also
	errorMessage:string = "";
    message:string = "";
    image:any=null;
	
/*
    constructor(fname: string, email: string) {
        this.fname = fname;
        this.email = email;
    }
    */

}