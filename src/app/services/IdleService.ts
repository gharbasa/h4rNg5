import { Injectable } from '@angular/core';
import { LocalStorageService } from './LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../models/AppSettings';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Injectable()
export class IdleService {
	
	idleState = 'Not started.';
  	timedOut = false;
  	//lastPing?: Date = null;

	constructor(private localStorageService: LocalStorageService,
				private logger: LoggingService,
				private loginService: LoginService,
				private idle: Idle, private keepalive: Keepalive,
				private router: Router) { 
		
	}

	startIdleService() {
		this.logger.info("starting startIdleService");
		let that = this;
	    // sets an idle timeout of 5 seconds, for testing purposes.
	    this.idle.setIdle(AppSettings.IDLE_TIME);

	    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
	    this.idle.setTimeout(AppSettings.WAIT_TIME_AFTER_IDLE);
	    
	    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
	    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

	    this.idle.onIdleEnd.subscribe(() => {
	      this.idleState = 'No longer idle.';
	      this.logger.info("Ok user came back online, No longer idle.");
	    });

	    this.idle.onTimeout.subscribe(() => {
	      this.idleState = 'Timed out!';
	      this.timedOut = true;
	      this.logger.info("Timed out!");
	      that.logout();
	    });
	    this.idle.onIdleStart.subscribe(() => {
	      this.idleState = 'You\'ve gone idle!';
	      this.logger.info("You\'ve gone idle!");
	    });
	  
	    this.idle.onTimeoutWarning.subscribe(countdown => {
	      this.idleState = 'You will time out in ' + countdown + ' seconds!';
	      this.logger.info("You will time out in ' + countdown + ' seconds!");
	    });

	    //sets the ping interval to 15 seconds
	    /**
	    this.keepalive.interval(15);

	    this.keepalive.onPing.subscribe(() => {
	      this.lastPing = new Date()
	      this.logger.info("Pinging");
	    });
	    */

	    this.reset();
	}

	reset() {
	    this.idle.watch();
	    this.idleState = 'Started.';
	    this.timedOut = false;
	    this.logger.info("Reset....");
  	}

  logout() {
  	let that = this;
    let userJSON = this.localStorageService.getItem('user');
    let user = JSON.parse(userJSON);
    let userId = user.id;
    this.logger.log(this,"User will be logged out");    
    that.loginService.remove(userId).subscribe(res => {
      this.logger.log(this,"Logout successful");
      that.localStorageService.removeItem('user');
      this.router.navigate(['login']);
    }
    ,err => {
      this.logger.error(this,"Somehow Logout failed.");
      that.localStorageService.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}