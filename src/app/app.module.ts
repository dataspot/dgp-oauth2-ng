import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DgpOauth2Module, getAuthServiceConfigProvider } from 'dgp-oauth2-ng';

import { AppComponent } from './app.component';
import { AuthService } from 'projects/dgp-oauth2-ng/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DgpOauth2Module,
  ],
  providers: [
    AuthService,
    getAuthServiceConfigProvider('https://next.obudget.org'),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
