import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from '../src';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {provideAuthService} from "../src/services";

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
      provideAuthService('https://localhost:8001')
  ]
})
export class AppModule {
}
