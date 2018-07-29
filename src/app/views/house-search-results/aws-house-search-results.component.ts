import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { LoginService } from '../../services/login.service';
import { Pagination } from '../../models/Pagination';
import { Router } from '@angular/router';
import { HousePicsService } from '../../services/HousePicsService';
import { LoggingService } from 'loggerservice';
import { MatDialog } from '@angular/material';
import { HouseSearchResultsComponent } from './house-search-results.component';

@Component({
  selector: 'h4r-house-search-results',
  templateUrl: './house-search-results.component.html',
  styleUrls: ['./house-search-results.component.scss']
})
export class AwsHouseSearchResultsComponent extends HouseSearchResultsComponent {

  public errorMessage:string = "";
  //private houses:Array<House> = [];
  constructor(public houseService:HouseService,
            public loginService:LoginService,
            public router: Router,
            public housePicsService: HousePicsService
            , public logger: LoggingService
            , public dialog: MatDialog) { 
              super(houseService, loginService, router, housePicsService, logger, dialog);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  performSearch() {
    let that = this;
    //this.houses.length = 0;
    this.houseService.cloudSearch().subscribe(res => {
      that.pageSettings = new Pagination(res, true, true); //We have to build a new instance of pagination, existing instance will not refresh the view.
    });
  }

}
