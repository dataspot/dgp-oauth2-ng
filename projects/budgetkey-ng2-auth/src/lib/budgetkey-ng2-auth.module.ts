import { NgModule } from '@angular/core';
import { AuthComponent } from './budgetkey-ng2-auth.component';
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
export class BudgetkeyNg2AuthModule { }
