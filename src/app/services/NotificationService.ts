import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Notification } from '../models/Notification';

@Injectable()
export class NotificationService {
	
	constructor(private http: HttpClient) { }
	
	private userNotifications:string = '/api/1/users/{user.id}/notifications';
	private basePath:string = '/api/1/notifications';
	
	update(notification:Notification) {
		return this.http.put(this.basePath + "/" + notification.id, notification);
	}
	
	remove(notificationId:number) {
		return this.http.delete(this.basePath + "/" + notificationId);
	}
	
	list(userId:number) {
		let url = this.userNotifications.replace("{user.id}", userId);
		return this.http.get(url);
	}
}
