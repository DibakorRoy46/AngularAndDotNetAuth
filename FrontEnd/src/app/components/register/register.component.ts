import { Expression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  type:string="password";
  typeCon:string="password";
  isText:boolean=false;
  isTextCon:boolean=false;
  eyeIcon:string="fa-eye-slash";
  eyeIconCon:string="fa-eye-slash";
  isAgree:boolean=true;
  registerForm:FormGroup=new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6),
                          Validators.maxLength(15)]),
      confirmPassword:new FormControl('',[Validators.required,Validators.minLength(6),
                          Validators.maxLength(15),this.matchValues('password')]),
      terms:new FormControl(false,Validators.requiredTrue),
      update:new FormControl(false)
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value ===control.parent?.get(matchTo)?.value ?
       null: { isMatching: true };
    };
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
  }
  hideShowPassCon(){
    this.isTextCon=!this.isTextCon;
    this.isTextCon?this.eyeIconCon="fa-eye":this.eyeIconCon="fa-eye-slash";
    this.isTextCon? this.typeCon="text":this.typeCon="password";
  }
  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
    else{
      this.validateAllFormFields(this.registerForm);
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
    if(this.registerForm.controls['terms'].errors){
      this.isAgree=false;
    }
  }
  inputValidation(controlName: string):string{
      return (this.registerForm.controls[controlName].errors &&
             (this.registerForm.controls[controlName].touched ||
              this.registerForm.controls[controlName].dirty)
              ?'input-form is-invalid':
              (this.registerForm.controls[controlName].touched ||
              this.registerForm.controls[controlName].dirty)
              ?'input-form is-valid border-green-600':'input-form');
  }

  getError(controlName: string): string {
    const control = this.registerForm.controls[controlName];
    for (const errorName in control.errors) {
      if (control.errors.hasOwnProperty(errorName) && control.touched) {
        return this.getErrorMessage(errorName, control.errors[errorName],controlName);
      }
    }
    return '';
  }
  getErrorMessage(errorName: string, errorValue: any,controlName:string): string {
    switch (errorName) {
      case 'required':
        return `This ${controlName} is required`;
      case 'minlength':
        return `This ${controlName} should be at least ${errorValue.requiredLength} characters long`;
      case 'maxlength':
        return `This ${controlName} should be at less than or equal to ${errorValue.requiredLength} characters long`;
      case 'email':
        return 'Invalid email format';
      case 'isMatching':
        return 'Password and Confirm Password must be matched';
      case 'requiredtrue':
        return 'This ${controlName} is required';
      default:
        return '';
    }
  }
}
