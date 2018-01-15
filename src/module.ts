import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";

import { AuthComponent } from './components/AuthComponent';
import { AuthService, getAuthServiceConfigProvider } from "./services";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    getAuthServiceConfigProvider('https://next.obudget.org'),
    AuthService
  ]
})
export class AuthModule { }
