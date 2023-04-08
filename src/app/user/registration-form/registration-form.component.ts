import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import IUser from '../../modals/user.modal';
import {RegisterValidator} from '../validators/register-validator';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  constructor(
    private auth: AuthService
  ) {

  };

  name:FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email:FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age:FormControl = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password:FormControl = new  FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password:FormControl = new FormControl('', [
    Validators.required
  ])
  phoneNumber:FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])
  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  },[RegisterValidator.match])

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    if(this.registerForm.valid){
      const user = this.registerForm.value as unknown as IUser;
      try {
        await this.auth.createUser(user)
      } catch(e) {
        console.error(e)

        this.alertMsg = 'An unexpected error occurred. Please try again later'
        this.alertColor = 'red'
        return
      }

      this.alertMsg = 'Success! Your account has been created.'
      this.alertColor = 'green'
    }

  }
}
