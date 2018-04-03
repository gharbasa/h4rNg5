import { Component, OnInit } from '@angular/core';
import { LoggingService, Config } from 'loggerservice';

@Component({
  selector: 'h4r-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private logger: LoggingService) { }

  ngOnInit() {
  }

}
