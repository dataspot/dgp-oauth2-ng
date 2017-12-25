import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './components/AuthComponent';
import { provideAuthService } from "./services";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      AuthComponent
  ],
  exports: [
      AuthComponent
  ]
})
export class AuthModule { }
