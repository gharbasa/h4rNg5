import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Notification } from '../models/Notification';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

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
	
	list(userId:number):Observable<Notification[]> {
		let url = this.userNotifications.replace("{user.id}", userId+"");
		return this.http.get(url).map(res => res as Notification[] || []);;
	}
}
