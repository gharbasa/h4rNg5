export class AppSettings {
	//public static readonly H4R_BACKEND_URL:string = "http://localhost:3000"; //This is for renderring attachment images
	/*
	static ADMIN_ROLE_STR:string = "Admin";
	static GUEST_ROLE_STR:string = "Guest";
	static TENANT_ROLE_STR:string = "Tenant";
	static LANDLORD_ROLE_STR:string = "Land lord";
	static ACC_ROLE_STR:string = "Accountant";
	static PROP_MGR_ROLE_STR:string = "Prop mgr";
	static PROP_EMP_ROLE_STR:string = "Prop emp";
	static PROP_AGC_COLL_EMP_STR:string = "Agency coll emp";
	static PROP_AGC_COLL_MGR_STR:string = "Agency coll mgr";
	*/
	/*
	static GUEST:number        = 0 //#default
	static ADMIN:number        = 1 << 16 //#100000000=256
	static TENANT:number       = 1 << 15 //#010000000
	static LAND_LORD:number    = 1 << 14 //#001000000
	static ACCOUNTANT:number   = 1 << 13
	static PROPERTY_MGMT_MGR:number = 1 << 12 //#Property management manager
	static PROPERTY_MGMT_EMP:number  = 1 << 11 //#Property management employee
	static AGENCY_COLLECTION_EMP:number    = 1 << 10 //#Collection agency emp
	static AGENCY_COLLECTION_MGR:number    = 1 << 9 //#Collection agency mgr
	*/
	
	public static readonly ROLES:any = {
	                    "GUEST": {value:0, label: "Guest"},
	                    "ADMIN": {value:1 << 16, label: "Admin"},
	                    "TENANT": {value: 1 << 15, label: " Tenant "},
	                    "LAND_LORD": {value: 1 << 14, label: "Land Lord"},
	                    "ACCOUNTANT": {value: 1 << 13, label: "Accountant"},
	                    "PROPERTY_MGMT_MGR": {value: 1 << 12, label: "Prop. Mgr"},
	                    "PROPERTY_MGMT_EMP": {value: 1 << 11, label: "Prop. Emp"},
	                    "AGENCY_COLLECTION_EMP": {value: 1 << 10, label: "Agency Emp"},
	                    "AGENCY_COLLECTION_MGR": {value: 1 << 9, label: "Agency Mgr"}
	};
	static IDLE_TIME:number = 15 * 60; //15 minutes
	static WAIT_TIME_AFTER_IDLE:number = 1 * 60; //1 minutes, after this user session is logged-out
	public static MAPS_KEY:string =  "<MAPS_KEY>";
}
