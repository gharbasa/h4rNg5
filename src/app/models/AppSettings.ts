
export class AppSettings {
	public static H4R_BACKEND_URL:string = "http://api.maaghar.com:3000/"; // etc/hosts file map this to localhost
	//public static readonly H4R_BACKEND_URL:string = "http://api.maaghar.com/";
	//public static readonly IMAGE_BASE_URL:string = "http://api.maaghar.com/";
	public static readonly IMAGE_S3_BUCKET_NAME:string = "maaghar";
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
	
	/**
	 * The order of display in the UI(user <=> house links)
	 * If you change this order, you will have to change it in identifyRoleStringConst function.
	 */
	public static readonly ROLES_LIST = ["TENANT", "LAND_LORD","MAINTENANCE", "AGENCY_COLLECTION_MGR", 
											"ACCOUNTANT", "PROPERTY_MGMT_MGR", 
											"PROPERTY_MGMT_EMP", "AGENCY_COLLECTION_EMP",
	];
	
	public static readonly LOGIN_TYPES:any = {
		DOMESTIC: 0// #default
    	,FACEBOOK :1 << 2 //#4  100
    	,LINKED : 1 << 3 // #8  1000
    	,GOOGLE : 1 << 4 //#16 10000
	};
	
	public static loginType:number = AppSettings.LOGIN_TYPES.DOMESTIC; //This is accessible across the application to know the user login type

	/**
	 * contract_type: 1(Income)
	 * contract_type: 2(Expenditure)
	 */
	public static readonly ROLES:any = {
	    "GUEST": {value:0, label: "Guest", contract_type:1},
	    "ADMIN": {value:1 << 16, label: "Admin", contract_type:1},
	    "TENANT": {value: 1 << 15, label: "Tenant ", contract_type:1},
	    "LAND_LORD": {value: 1 << 14, label: "Land Lord", contract_type:1},
	    "ACCOUNTANT": {value: 1 << 13, label: "Accountant", contract_type:1},
	    "PROPERTY_MGMT_MGR": {value: 1 << 12, label: "Prop. Mgr", contract_type:1},
	    "PROPERTY_MGMT_EMP": {value: 1 << 11, label: "Prop. Emp", contract_type:1},
	    "AGENCY_COLLECTION_EMP": {value: 1 << 10, label: "Agency Emp", contract_type:1},
		"AGENCY_COLLECTION_MGR": {value: 1 << 9, label: "Agency Mgr", contract_type:2},
		"MAINTENANCE": {value: 1 << 8, label: "Maintenance", contract_type:2},
	};

	static IDLE_TIME:number = 15 * 60; //15 minutes
	static WAIT_TIME_AFTER_IDLE:number = 1 * 60; //1 minutes, after this user session is logged-out
	public static MAPS_KEY:string =  "<MAPS_KEY>"; //<MAPS_KEY>
	public static FACEBOOK_APP_ID:string =  "<FACEBOOK_APP_ID>"; //<FACEBOOK_APP_ID>
	public static CLOUD_SEARCH:boolean = true;

	public static setEnvironment(environmentParam: any):void {
		AppSettings.H4R_BACKEND_URL = environmentParam.API_URL;
	}
	
	public static identifyRoleStringConst(role:number) {
		if(role == 0)
			return "GUEST";
		if(role == 1 << 16)
			return "ADMIN";
		if(role == 1 << 15)
			return AppSettings.ROLES_LIST[0];
		if(role == 1 << 14)
			return AppSettings.ROLES_LIST[1];
		if(role == 1 << 13)
			return AppSettings.ROLES_LIST[4];
		if(role == 1 << 12)
			return AppSettings.ROLES_LIST[5];
		if(role == 1 << 11)
			return AppSettings.ROLES_LIST[6];
		if(role == 1 << 10)
			return AppSettings.ROLES_LIST[7];
		if(role == 1 << 9)
			return AppSettings.ROLES_LIST[3];
		if(role == 1 << 8)
			return AppSettings.ROLES_LIST[2];
	}

	public static readonly CONTRACT_CREATION_TYPES:any = {
		"NEW":1,
		"CLONE":2,
		"RENEW":3
	};

}
