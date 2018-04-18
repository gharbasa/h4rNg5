import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

import {FormsModule} from "@angular/forms";
import { ImportComponent } from './import/import.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
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

import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/users/users.component';
import { UserRowComponent } from './views/user-row/user-row.component';
import { NotificationTypeComponent } from './views/notification-type/notification-type.component';
import { NotificationTypeListComponent } from './views/notification-type-list/notification-type-list.component';
import { NotificationTypeRowComponent } from './views/notification-type-row/notification-type-row.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HouseComponent } from './views/house/house.component';
import { HouseRowComponent } from './views/house-row/house-row.component';
import { HouseListComponent } from './views/house-list/house-list.component';
import { HousePicsComponent } from './views/house-pics/house-pics.component';
import { PicAlbumComponent } from './views/pic-album/pic-album.component';
import { HouseNotesComponent } from './views/house-notes/house-notes.component';
import { HouseNoteComponent } from './views/house-note/house-note.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { NotificationComponent } from './views/notification/notification.component';
import { UserHouseLinksComponent } from './views/user-house-links/user-house-links.component';
import { HouseContractsComponent } from './views/house-contracts/house-contracts.component';
import { HouseContractComponent } from './views/house-contract/house-contract.component';
import { HouseContractNotesComponent } from './views/house-contract-notes/house-contract-notes.component';
import { HouseContractNoteComponent } from './views/house-contract-note/house-contract-note.component';
import { HouseContractPicsComponent } from './views/house-contract-pics/house-contract-pics.component';
import { UserIdleWarningDialogComponent } from './views/user-idle-warning-dialog/user-idle-warning-dialog.component';
import { ZoomPicAlbumComponent } from './views/zoom-pic-album/zoom-pic-album.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PerformanceChartsComponent } from './views/performance-charts/performance-charts.component'; 
import { ReceivablesComponent } from './views/receivables/receivables.component';
import { ReceivedPaymentsComponent } from './views/received-payments/received-payments.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(fas, far);
//library.add(faCoffee);

import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

//d3
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts';


const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent
    }
    ,
    {
        path: 'postlogin',
        component: HomeComponent
    }
    ,
    {
        path: 'postlogout',
        component: HomeComponent
    }
    ,
    {
        path: 'newUser',
        component: NewuserComponent
    }
    ,
    {
        path: 'editUser/:feature',
        component: NewuserComponent
    }
    ,
    {
        path: 'postupdate',
        component: HomeComponent
    }
    ,
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'users',
        component: UsersComponent
    }
    ,
    {
        path: 'notificationTypes',
        component: NotificationTypeListComponent
    }
    ,
    {
        path: 'houses',
        component: HouseListComponent
    }
    ,
    {
        path: 'house/:id',
        component: HouseComponent
    }
    ,
    {
        path: 'notificationType/:id',
        component: NotificationTypeComponent
    }
    ,
    {
        path: 'notifications',
        component: NotificationsComponent
    }
    ,
    {
        path: 'houses_users',
        component: UserHouseLinksComponent
    }
    ,
    {
        path: 'house_contracts',
        component: HouseContractsComponent
    }
    ,
    {
        path: 'house_contract/:id',
        component: HouseContractComponent
    }
    ,
    {
        path: 'reset-password',
        component: ForgotPasswordComponent
    }
    ,
    {
        path: 'performance',
        component: PerformanceChartsComponent
    }
    ,
    {
        path: 'receivables/:id',
        component: ReceivablesComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ImportComponent,
    AboutComponent,
    HomeComponent,
    NewuserComponent,
    AdminComponent,
    UsersComponent,
    UserRowComponent,
    NotificationTypeComponent,
    NotificationTypeListComponent,
    NotificationTypeRowComponent,
    HouseComponent,
    HouseRowComponent,
    HouseListComponent,
    HousePicsComponent,
    PicAlbumComponent,
    HouseNotesComponent,
    HouseNoteComponent,
    NotificationsComponent,
    NotificationComponent,
    UserHouseLinksComponent,
    HouseContractsComponent,
    HouseContractComponent,
    HouseContractNotesComponent,
    HouseContractNoteComponent,
    HouseContractPicsComponent,
    UserIdleWarningDialogComponent,
    ZoomPicAlbumComponent,
    ForgotPasswordComponent,
    DoughnutChartComponent, 
    PieChartComponent, 
    BarChartComponent, PerformanceChartsComponent, ReceivablesComponent, ReceivedPaymentsComponent
  ],
   
  entryComponents: [
    UserIdleWarningDialogComponent,
    ZoomPicAlbumComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FontAwesomeModule, MatMenuModule,BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    MatDialogModule
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
