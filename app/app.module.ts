import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from '../src';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../src/services";

declare const process: any;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
      AuthService
  ]
})
export class AppModule {
}
