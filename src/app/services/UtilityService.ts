import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
	
	constructor() { }
	
	/**
	 * returns 'Wed Apr 04 2018 21:54:35 GMT-0400 (EDT)'
	 * 			trims  GMT-0400 (EDT)
	 */
	convertDateUTC2Local(dateString:string) {
		let dateObj:Date = new Date(dateString);
		let dateStr:string = dateObj.toString();
		let index:number = dateStr.indexOf(" GMT");
		dateStr = dateStr.substring(0,index);
		return dateStr;
	}	
}
