import { Injectable } from '@angular/core';
import { LocalStorageService } from './LocalStorageService';
import { LoggingService, Config } from 'loggerservice';
import { AppSettings } from '../models/AppSettings';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserIdleWarningDialogComponent } from '../views/user-idle-warning-dialog/user-idle-warning-dialog.component';
import { AuthService } from "angularx-social-login";

@Injectable()
export class IdleService {
	
	idleState = 'Not started.';
  	timedOut = false;
  	//lastPing?: Date = null;
  	private dialogRef:any = null;
	constructor(private localStorageService: LocalStorageService,
				private logger: LoggingService,
				private loginService: LoginService,
				private idle: Idle, private keepalive: Keepalive,
				private router: Router,
				private dialog: MatDialog,
				private authService: AuthService) { 
		
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
	      this.logger.info("Ok user came back online, No longer idle...");
	      that.closeAllDialogs();
	    });

	    this.idle.onTimeout.subscribe(() => {
	      this.idleState = 'Timed out!';
	      this.timedOut = true;
	      this.logger.info("Timed out!");
	      //close all the dialogs
	      that.logout();
	    });
	    this.idle.onIdleStart.subscribe(() => {
	      this.idleState = 'You\'ve gone idle!';
	      this.logger.info("You\'ve gone idle!");
	      that.openDialog();
	    });
	  
	    this.idle.onTimeoutWarning.subscribe(countdown => {
	      this.idleState = 'You will time out in ' + countdown + ' seconds!';
	      this.logger.info('You will time out in ' + countdown + ' seconds!');
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
    let user = this.loginService.getCurrentUser();
    let userId = user.id;
		this.logger.log(this,"User will be logged out");    
    that.loginService.remove(userId).subscribe(res => {
      this.logger.log(this,"Logout successful");
      that.localStorageService.removeItem('user');
      this.router.navigate(['login']);
      this.loginService.clearBuffer();
      that.closeAllDialogs();
    }
    ,err => {
      this.logger.error(this,"Somehow Logout failed.");
      that.localStorageService.removeItem('user');
      this.router.navigate(['login']);
      
		});
		this.authService.signOut(); //federated user logout
		that.localStorageService.removeItem('fbAuthToken');
    return false;
  }

  //Stop the idle service, this is called from the login component
  stop() {
  	this.logger.info("ok IdleService is stopped.");
  	this.idle.stop();
  }

  openDialog(): void {
  	this.logger.info("IdleService, request to open the dialog.");
  	let that = this;
  	if(this.dialogRef != null) {
  		this.logger.info("IdleService, There is a dialog already open.");
  		return;
  	}
  	this.logger.info("IdleService, Opening the dialog.");
  	let user = this.loginService.getCurrentUser();
  	let userName:string = "";
	if(user != null) {
	    userName = user.fullName;
	}

  	this.dialogRef = this.dialog.open(UserIdleWarningDialogComponent, {
      width: '300px',
      data: { userName: userName}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The idle dialog is closed');
      //this.animal = result;
      that.dialogRef = null;
    });
  }
  
  closeAllDialogs():void {
  	this.logger.info("Request to close dialog on-demand.");
  	this.dialog.closeAll();
    this.dialogRef = null;
  }
}