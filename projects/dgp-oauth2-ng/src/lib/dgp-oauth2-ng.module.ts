import { NgModule } from '@angular/core';
import { AuthComponent } from './dgp-oauth2-ng.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [AuthComponent]
})
export class DgpOauth2Module { }
