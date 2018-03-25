import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AsyncLocalStorageModule
  ],
  providers: [LoginService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
