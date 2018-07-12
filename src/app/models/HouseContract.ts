import { CONTRACTTYPE_ENUM } from "./CONTRACTTYPE_ENUM";
import { AppSettings } from "./AppSettings";

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
	contract_type:number = 1;
	contract_type_str:string = "Income";
	from_contract_id:number = 0;// This atribute is used by the backend controller only, not mapped to the schema/model in the backend,
	renew:boolean; //This flag is sent by the view to the server. To renew this contract.
	created_by:number = 0;
    updated_by:number = 0;
    created_at:string = ""; 
    updated_at:string = "";
    note:string = "";
    roles:string = "";
	role:number = 0;
	tenant:boolean = false;
	land_lord:boolean = false;
	accountant:boolean = false;
	property_mgmt_mgr:boolean = false;
	property_mgmt_emp:boolean = false;
	agency_collection_emp:boolean = false;
	agency_collection_mgr:boolean = false;
	maintenance:boolean = false;
	onetime_contract:boolean = false;
	
	constructor() {

	}

	user:any =  {"fullName": ""};
    house:any = {"name": ""};

    errorMessage:string = "";
	message:string  = "";

	static determineContractTypeStr(contract:HouseContract):void {
		if (CONTRACTTYPE_ENUM.INCOME === contract.contract_type)
			contract.contract_type_str =  "Income";
		else if (CONTRACTTYPE_ENUM.EXPENSE === contract.contract_type)
			contract.contract_type_str = "Expense";
		else
			contract.contract_type_str = "Unknown";
	};

	static determineRoles(contract:HouseContract):void {
		contract.roles = "";
		if(contract.tenant == true) {
			contract.roles = contract.roles + AppSettings.ROLES["TENANT"].label + ", ";
		}
		if(contract.land_lord == true) {
			contract.roles = contract.roles + AppSettings.ROLES["LAND_LORD"].label + ", ";
		}
		if(contract.accountant == true) {
			contract.roles = contract.roles + AppSettings.ROLES["ACCOUNTANT"].label + ", ";
		}
		if(contract.property_mgmt_mgr == true) {
			contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_MGR"].label + ", ";
		}
		if(contract.property_mgmt_emp == true) {
			contract.roles = contract.roles + AppSettings.ROLES["PROPERTY_MGMT_EMP"].label + ", ";
		}
		if(contract.agency_collection_emp == true) {
			contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_EMP"].label + ", ";
		}
		if(contract.agency_collection_mgr == true) {
			contract.roles = contract.roles + AppSettings.ROLES["AGENCY_COLLECTION_MGR"].label + ", ";
		}
		if(contract.maintenance == true) {
			contract.roles = contract.roles + AppSettings.ROLES["MAINTENANCE"].label + ", ";
		}
	};
}
