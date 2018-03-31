import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service

import {FormsModule} from "@angular/forms";
import { ImportComponent } from './import/import.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { LoginService } from './services/login.service';
import { AppSettingsService } from './services/AppSettingsService';
import { LocalStorageService } from './services/LocalStorageService';
import { UserService } from './services/UserService';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';

import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/users/users.component';
import { UserRowComponent } from './views/user-row/user-row.component';


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
    UserRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, AppSettingsService, LocalStorageService, UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
