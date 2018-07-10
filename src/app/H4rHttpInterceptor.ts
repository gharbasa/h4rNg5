import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import {Observable} from 'rxjs';
import { HouseService } from "./services/HouseService";
import { LoggingService, Config } from 'loggerservice';

@Injectable()
export class H4rHttpInterceptor implements HttpInterceptor {

    constructor(private logger: LoggingService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Abed----H4rHttpInterceptor...");
        if(request.url.indexOf(HouseService.GoogleMaps_Url) == -1) {
            request = request.clone({
                /*
                withCredentials: true;
                origin: 'http://localhost:4200' 
                */
            withCredentials: true
            }); 
        } else {
            this.logger.log(this, "Bypassing withCredentials header");
        }

        return next.handle(request);
    }
}