import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class RegisterValidator {
  static match(controlName:string,matchingControlName:string):ValidatorFn{
    return (group:AbstractControl):ValidationErrors|null=>{
      const  control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      if(!control || !matchingControl){
        return {controlNoteFound:false};
      };
      const error = control.value === matchingControl.value ? null : {noMatch:true};
      return error;
    }
  }
}
