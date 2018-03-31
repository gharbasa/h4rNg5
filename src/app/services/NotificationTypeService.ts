import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { NotificationType } from '../models/NotificationType';

@Injectable()
export class NotificationTypeService {
	
	constructor(private http: HttpClient) { }
	
	private basePath:string = '/api/1/notification_types';
	
	get(id:number) {
		return this.http.get(this.basePath + "/" + id);
	}

	create(notificationType:NotificationType) {
		return this.http.post(this.basePath, notificationType);
	}

	update(notificationType:NotificationType) {
		return this.http.put(this.basePath + "/" + notificationType.id, notificationType);
	}
	
	remove(id:number) {
		return this.http.delete(this.basePath + "/" + id);
	}
	
	list() {
		return this.http.get(this.basePath);
	}
}
