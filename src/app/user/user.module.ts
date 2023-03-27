import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import {SheardModule} from '../sheard/sheard.module';



@NgModule({
  declarations: [
    AuthModalComponent
  ],
  exports: [
    AuthModalComponent,

  ],
  imports: [
    CommonModule,
    SheardModule
  ]
})
export class UserModule { }
