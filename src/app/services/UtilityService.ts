import { Injectable } from '@angular/core';
import { LoggingService } from 'loggerservice';
import { AppSettings } from '../models/AppSettings';

@Injectable()
export class UtilityService {
	
	constructor(private logger: LoggingService) { }
	
	/**
	 * Input date format: Wed Apr 04 2018 21:54:35 GMT-0400 (EDT)
	 * returns 'Wed Apr 04 2018 21:54:35'
	 * 			trims  GMT-0400 (EDT)
	 */
	convertDateUTC2Local(dateString:string) {
		let dateObj:Date = new Date(dateString);
		let dateStr:string = dateObj.toString();
		let index:number = dateStr.indexOf(" GMT");
		dateStr = dateStr.substring(0,index);
		return dateStr;
	}

	public static prepareS3BucketUrl(urlParam:string):string {
		//urlParam = s3.amazonaws.com/maaghar/house_pics/pictures/000/000/040/original/IMG_2401.jpg?1528432684
		if(urlParam.indexOf("//s3.amazonaws.com") > -1) {
			let index = urlParam.indexOf("/" + AppSettings.IMAGE_S3_BUCKET_NAME);
			let url:string = "http://" + AppSettings.IMAGE_S3_BUCKET_NAME + 
						".s3.amazonaws.com/" + 
						urlParam.substring(index + AppSettings.IMAGE_S3_BUCKET_NAME.length + 2);
			return url;
		}
		return urlParam;
	}

	public static getFormattedDate():string {
		var todayTime = new Date();
		var month = todayTime.getMonth() + 1;
		var day = todayTime.getDate();
		var year = todayTime.getFullYear();
		return day + "-" + month + "-" + year;
	}
}
