import { HouseContract } from "./HouseContract";

export class UserHouseLink {
	id:number = 0;
    user_id:number = 0;
    house_id: number = 0;
    role: number = 0;
    user_house_contract_id:number =  0;
    active: boolean = true;
    created_by:number = 0;
    updated_by:number = 0;
	
	user:any = null; //Json readonly
	house:any = null; //json readonly

	tenant:boolean = false;
	land_lord:boolean = false;
	accountant:boolean = false;
	property_mgmt_mgr:boolean = false;
	property_mgmt_emp:boolean = false;
	agency_collection_emp:boolean = false;
	agency_collection_mgr:boolean = false;
	maintenance:boolean = false;

	land_lord_id:number = 0;
	org_land_lord_id:number = 0;
	tenant_id:number = 0;
	org_tenant_id:number = 0;
	accountant_id:number = 0;
	org_accountant_id:number = 0;
	property_mgmt_mgr_id:number = 0;
	org_property_mgmt_mgr_id:number = 0;
	property_mgmt_emp_id:number = 0;
	org_property_mgmt_emp_id:number = 0;
	agency_collection_emp_id:number = 0;
	org_agency_collection_emp_id:number = 0;
	agency_collection_mgr_id:number = 0;
	org_agency_collection_mgr_id:number = 0;
	maintenance_id:number = 0;
	org_maintenance_id:number = 0;

	tenant_active_contract:HouseContract = null;
	tenant_inactive_contracts:Array<HouseContract> = [];
	accountant_active_contract:HouseContract = null;
	accountant_inactive_contracts:Array<HouseContract> = [];
	land_lord_active_contract:HouseContract = null;
	land_lord_inactive_contracts:Array<HouseContract> = [];
	property_mgmt_mgr_active_contract:HouseContract = null;
	property_mgmt_mgr_inactive_contracts:Array<HouseContract> = [];
	property_mgmt_emp_active_contract:HouseContract = null;
	property_mgmt_emp_inactive_contracts:Array<HouseContract> = [];
	agency_collection_mgr_active_contract:HouseContract = null;
	agency_collection_mgr_inactive_contracts:Array<HouseContract> = [];
	agency_collection_emp_active_contract:HouseContract = null;
	agency_collection_emp_inactive_contracts:Array<HouseContract> = [];
	maintenance_active_contract:HouseContract = null;
	maintenance_inactive_contracts:Array<HouseContract> = [];
	updateType:string = "";

	errorMessage:string = "";
	message:string  = "";
	/*
	constructor(fname: string, email: string) {
		this.fname = fname;
		this.email = email;
	}*/
	
}
