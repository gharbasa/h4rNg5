import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

import {FormsModule} from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { h4rRoutes } from './h4rRoutes';

import { LoggingService, Config } from 'loggerservice';
import { LoginService } from './services/login.service';
import { NotificationTypeService } from './services/NotificationTypeService';
import { HouseService } from './services/HouseService';
import { AppSettingsService } from './services/AppSettingsService';
import { LocalStorageService } from './services/LocalStorageService';
import { UserService } from './services/UserService';
import { CommunityService } from './services/CommunityService';
import { HousePicsService } from './services/HousePicsService';
import { HouseNoteService } from './services/HouseNoteService';
import { NotificationService } from './services/NotificationService';
import { UtilityService } from './services/UtilityService';
import { UserHouseLinkService } from './services/UserHouseLinkService';
import { HouseContractsService } from './services/HouseContractsService';
import { HouseContractNoteService } from './services/HouseContractNoteService';
import { UserHouseContractPicService } from './services/UserHouseContractPicService';
import { IdleService } from './services/IdleService';
import { PaymentService } from './services/PaymentService';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fas, far);
//library.add(faCoffee);

import { AppComponent } from './app.component';

import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';

import { NvD3Module } from 'ng2-nvd3';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

@NgModule({
  declarations: h4rRoutes.componentDeclarations,
  
  entryComponents: h4rRoutes.modalDialogEntryPoints,

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(h4rRoutes.routes, {useHash: true}),
    FontAwesomeModule, MatMenuModule,BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    MatDialogModule,NvD3Module
  ],
  providers: [Config ,LoggingService, LoginService, AppSettingsService
                , LocalStorageService, UserService
                , NotificationTypeService, HouseService
                , CommunityService, HousePicsService, HouseNoteService
                , NotificationService, UtilityService, UserHouseLinkService, HouseContractsService
                , HouseContractNoteService, UserHouseContractPicService
                , IdleService, PaymentService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
