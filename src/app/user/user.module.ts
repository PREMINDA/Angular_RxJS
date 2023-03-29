import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import {SheardModule} from '../sheard/sheard.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AuthModalComponent,
    LoginFormComponent,
    RegistrationFormComponent
  ],
  exports: [
    AuthModalComponent,
  ],
    imports: [
        CommonModule,
        SheardModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class UserModule { }
