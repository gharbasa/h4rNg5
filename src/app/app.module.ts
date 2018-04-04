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
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [Config ,LoggingService, LoginService, AppSettingsService
                , LocalStorageService, UserService
                , NotificationTypeService, HouseService
                , CommunityService, HousePicsService, HouseNoteService, NotificationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
