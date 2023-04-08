import {AbstractControl, ValidationErrors} from '@angular/forms';

export class RegisterValidator {
  static match(group:AbstractControl):ValidationErrors|null{
    const  control = group.get('password');
    const matchingControl = group.get('confirm_password');

    if(!control || !matchingControl){
      return {controlNoteFound:false};
    };

    const error = control.value === matchingControl.value ? null : {noMatch:true};
    return error;
  }
}
