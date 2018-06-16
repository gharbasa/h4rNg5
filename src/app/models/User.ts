import { AppSettings } from "./AppSettings";

export class User {
	id: number = 0;
    email: string = ""; //used in self service password reset also
    fname: string = "";
    mname: string = "";
    lname: string = "";
    fullName: string = "";
    verified: boolean = false;
    adhaar_no: string = ""; //used in self service password reset also
    created_by: number = 0;
    updated_by: number = 0;
    createdAt:string = "";
    avatar: any = "";
    avatarURL:string = "";
	password: string = ""; //used in self service password reset also
	password_confirmation: string = ""; //used in self service password reset also
    login: string = ""; //used in self service password reset also
    phone1: string = "";
    addr1: string = "";
    addr2: string = "";
    addr3: string = "";
    addr4: string = "";
    subscriptionType: number = 1; //default is 1 year in schema.
    subscriptionEndDate:string = ""; 
    role: number = 0;
    admin: boolean = false;
    guest: boolean = false;
    community_id:number = 0;
	promote2Admin:boolean = false;
	roleStr: string = ""; 
	sexStr:string = "";
	sex:number = -1;  //used in self service password reset also
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