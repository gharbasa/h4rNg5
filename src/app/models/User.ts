
export class User {
	id: number = 0;
    email: string = "";
    fname: string = "";
    mname: string = "";
    lname: string = "";
    verified: boolean = false;
    adhaar_no: string = "";
    created_by: number = 0;
    updated_by: number = 0;
    avatar: string = "";
    login: string = "";
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