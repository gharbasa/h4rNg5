import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-user-idle-warning-dialog',
  templateUrl: './user-idle-warning-dialog.component.html',
  styleUrls: ['./user-idle-warning-dialog.component.scss']
})
export class UserIdleWarningDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserIdleWarningDialogComponent>,
  			  @Inject(MAT_DIALOG_DATA) public data: any,
  			  private logger: LoggingService) { 


  }

	onNoClick(): void {
		this.logger.info(this, "Closing the dialog.");
    this.dialogRef.close();
    this.dialogRef = null;
  }
}
