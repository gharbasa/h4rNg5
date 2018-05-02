import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { LoginService } from '../../services/login.service';
import { House } from '../../models/House';
import { Pagination } from '../../models/Pagination';

@Component({
  selector: 'h4r-house-search-results',
  templateUrl: './house-search-results.component.html',
  styleUrls: ['./house-search-results.component.scss']
})
export class HouseSearchResultsComponent extends H4rbaseComponent {

  private pageSettings:Pagination = new Pagination(null);
  //private houses:Array<House> = [];
  constructor(private houseService:HouseService,
            public loginService:LoginService) { 
              super(loginService);
  }

  ngOnInit() {
    this.performSearch();
  }

  performSearch() {
    let that = this;
    //this.houses.length = 0;
    this.houseService.search().subscribe(res => {
      that.pageSettings = new Pagination(res); //We have to build a new instance of pagination, existing instance will not refresh the view.
    });
  }
}
