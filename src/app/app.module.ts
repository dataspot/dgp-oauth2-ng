import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BudgetkeyNg2AuthModule, getAuthServiceConfigProvider } from 'budgetkey-ng2-auth';

import { AppComponent } from './app.component';
import { AuthService } from 'projects/budgetkey-ng2-auth/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BudgetkeyNg2AuthModule,
  ],
  providers: [
    AuthService,
    getAuthServiceConfigProvider('https://next.obudget.org'),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
