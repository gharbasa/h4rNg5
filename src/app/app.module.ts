import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // replaces previous Http service

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { AccountService } from './services/AccountService';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fas, far, fab);
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

//date-picker
import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './date-formatter/NgbDateCustomParserFormatter';
import { TicketService } from './services/TicketService';
import { TicketNoteService } from './services/TicketNoteService';
import { AgmCoreModule } from '@agm/core';
import { AppSettings } from './models/AppSettings';
import { H4rHttpInterceptor } from './h4rHttpInterceptor';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import {FacebookLoginProvider} from "angularx-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { OrderModule } from 'ngx-order-pipe';

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
 
/**
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
  */

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(AppSettings.FACEBOOK_APP_ID, fbLoginOptions)
  }
  /**,
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id", googleLoginOptions)
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }*/
]);
 
export function provideConfig() {
  return config;
}


//ngx-file-drop
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
    MatDialogModule,NvD3Module, NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: AppSettings.MAPS_KEY,
      libraries: ["places"]
    }), ReactiveFormsModule,
    SocialLoginModule,
    OrderModule
  ],
  providers: [Config ,LoggingService, LoginService, AppSettingsService
                , LocalStorageService, UserService
                , NotificationTypeService, HouseService
                , CommunityService, HousePicsService, HouseNoteService
                , NotificationService, UtilityService, UserHouseLinkService, HouseContractsService
                , HouseContractNoteService, UserHouseContractPicService
                , IdleService, PaymentService
                ,{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
                ,TicketService, TicketNoteService,
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: H4rHttpInterceptor ,
                  multi: true
                },
                AccountService,
                {provide: AuthServiceConfig, useFactory: provideConfig}
              ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
