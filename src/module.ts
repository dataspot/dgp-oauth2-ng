import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";

import { AuthComponent } from './components/AuthComponent';
import { getAuthServiceConfigProvider } from "./services";

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
      getAuthServiceConfigProvider('https://next.obudget.org')
  ]
})
export class AuthModule { }
