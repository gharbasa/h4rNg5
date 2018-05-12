import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/HouseService';
import { H4rbaseComponent } from '../h4rbase/h4rbase.component';
import { LoginService } from '../../services/login.service';
import { House } from '../../models/House';
import { Pagination } from '../../models/Pagination';
import { Router } from '@angular/router';
import { HousePicsService } from '../../services/HousePicsService';
import { LoggingService } from 'loggerservice';
import { MatDialog } from '@angular/material';
import { HousePic } from '../../models/HousePic';
import { ZoomPicAlbumComponent } from '../zoom-pic-album/zoom-pic-album.component';

@Component({
  selector: 'h4r-house-search-results',
  templateUrl: './house-search-results.component.html',
  styleUrls: ['./house-search-results.component.scss']
})
export class HouseSearchResultsComponent extends H4rbaseComponent {

  public pageSettings:Pagination = new Pagination(null);
  private dialogRef:any = null;
  public errorMessage:string = "";
  //private houses:Array<House> = [];
  constructor(private houseService:HouseService,
            public loginService:LoginService,
            private router: Router,
            private housePicsService: HousePicsService
            , private logger: LoggingService
            , private dialog: MatDialog) { 
              super(loginService);
  }

  ngOnInit() {
    this.performSearch();
    this.houseService.setOperation("read");
  }

  performSearch() {
    let that = this;
    //this.houses.length = 0;
    this.houseService.search().subscribe(res => {
      that.pageSettings = new Pagination(res); //We have to build a new instance of pagination, existing instance will not refresh the view.
    });
  }

  //routerLink="../house/{{house.id}}"
  showHouseDetails(house:House):boolean {
    this.router.navigate(['house/' + house.id]);
    return false;
  }

  openHousePics(house:House):boolean {
    this.fetchHousePics(house);  
    return false;
  }

  fetchHousePics(house:House):void {
    let that = this;
    let housePics:Array<HousePic> = [];
		this.housePicsService.listByHouse(house.id).subscribe(resp => {
			for(var i in resp) {
				var row = resp[i];
				//row.image = AppSettings.H4R_BACKEND_URL + row.picture;
				row.image = row.picture;
        housePics.push(row);
      }
      that.zoom(housePics);
			this.logger.log(this, "Number of House Pics=" +  housePics.length);
		},
		err => {
			this.logger.log(this, "Error fetching house pics associated with the house=" +  house.id);	
		});
  }
  
  zoom(housePics:Array<HousePic>) {
		let that = this;
		this.dialogRef = this.dialog.open(ZoomPicAlbumComponent, {
			//width: '500px',
			data: { housePics: housePics}
		});

		this.dialogRef.afterClosed().subscribe(result => {
			console.log('The zoom-pic dialog is closed');
			//this.animal = result;
			that.dialogRef = null;
		});
	}
}
