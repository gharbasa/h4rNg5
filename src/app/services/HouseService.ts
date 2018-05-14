import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoggingService, Config } from 'loggerservice';
import { House } from '../models/House';
import { LoginService } from '../services/login.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class HouseService {
	
	constructor(private http: HttpClient, private loginService: LoginService,
					private logger: LoggingService) { }
	
	private basePath_admin:string = '/api/1/houses';
	private basePath_nondmin:string = '/api/1/users/{user.id}/houses';
	private searchKeyword:string = "";
	private view:string = "";
	get(houseId:number):Observable<House> {
		return this.http.get(this.basePath_admin + "/" + houseId).map(res => res as House || null);
	}

	create(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.post(this.basePath_admin, house);
	}
	
	update(house:House) {
		this.nullifyNonServerAttrs(house);
		return this.http.put(this.basePath_admin + "/" + house.id, house);
	}
	
	remove(houseId:number) {
		return this.http.delete(this.basePath_admin + "/" + houseId);
	}
	
	list(community_id:number):Observable<House[]>  {
		let url:string = "";
		if(this.loginService.isAdminUser()) {
			this.logger.log(this, "Hey Admin, fetching all houses")
			url = this.basePath_admin; 
			if(community_id != null)
				url = url + "?community_id=" + community_id;
		}else {
			let userId:number = this.loginService.getCurrentUser().id;
			this.logger.log(this, "houses for Userid=" + userId)
			url = this.basePath_nondmin.replace("{user.id}", userId+"");
		}
		return this.http.get(url).map(res => res as House[] || []);
	}

	list4Reports():Observable<House[]> {
		this.logger.log(this, "list4Reports")
		let path = this.basePath_admin + "/list4Reports"; 
		return this.http.get(path).map(res => res as House[] || []);
	}

	/**
	 * Following attributes are not needed to the backend server.
	 */
	nullifyNonServerAttrs(house:House) {
		house.images = null;
		house.errorMessage = "";
		house.message = "";
	}

	updateOpenHouseFlag(house:House) {
		let partUrl:string = "";
		if(house.is_open === true) //user wants to bring the house open
			partUrl = "/makeitOpen";
		else
			partUrl = "/makeitClosed";
		return this.http.put(this.basePath_admin + "/" + house.id + partUrl, null);
	}
	
	updateActiveFlag(house:House) {
		let partUrl:string = "";
		if(house.active === true) //user wants to activate the house
			partUrl = "/activate";
		else
			partUrl = "/inactivate";
		return this.http.put(this.basePath_admin + "/" + house.id + partUrl, null);
	}

	setSearchKeyword(keyword:string) {
		this.searchKeyword = keyword;
	}
	
	search():Observable<House[]> {
		this.logger.log(this, "search for houses, keyword=" + this.searchKeyword);
		let path = this.basePath_admin + "/search?search=" + this.searchKeyword; 
		return this.http.get(path).map(res => res as House[] || []);
	}

	setOperation(operation) {
		this.view = operation;
	}
	
	isReadonlyView() {
		return this.view === "read";
	}

	/**
	 * Reference: https://developers.google.com/maps/documentation/geocoding/intro
	 * @param house 
	 * response: {
		"results" : [
			{
				"address_components" : [
					{
					"long_name" : "1600",
					"short_name" : "1600",
					"types" : [ "street_number" ]
					},
					{
					"long_name" : "Amphitheatre Pkwy",
					"short_name" : "Amphitheatre Pkwy",
					"types" : [ "route" ]
					},
					{
					"long_name" : "Mountain View",
					"short_name" : "Mountain View",
					"types" : [ "locality", "political" ]
					},
					{
					"long_name" : "Santa Clara County",
					"short_name" : "Santa Clara County",
					"types" : [ "administrative_area_level_2", "political" ]
					},
					{
					"long_name" : "California",
					"short_name" : "CA",
					"types" : [ "administrative_area_level_1", "political" ]
					},
					{
					"long_name" : "United States",
					"short_name" : "US",
					"types" : [ "country", "political" ]
					},
					{
					"long_name" : "94043",
					"short_name" : "94043",
					"types" : [ "postal_code" ]
					}
				],
				"formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
				"geometry" : {
					"location" : {
					"lat" : 37.4224764,
					"lng" : -122.0842499
					},
					"location_type" : "ROOFTOP",
					"viewport" : {
					"northeast" : {
						"lat" : 37.4238253802915,
						"lng" : -122.0829009197085
					},
					"southwest" : {
						"lat" : 37.4211274197085,
						"lng" : -122.0855988802915
					}
					}
				},
				"place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
				"types" : [ "street_address" ]
			}
		],
		"status" : "OK"
		}
	 */
	getlatlng(house:House):any {
		let address:string = house.addr1 + "," + house.addr2 + "," + house.addr3 + "," + house.addr4;
		address = address.replace(" ", "+");
		this.logger.info(this,"House address going to search=" + address);
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address
		// + "&key=" + AppSettings.MAPS_KEY
		);
	}
}
