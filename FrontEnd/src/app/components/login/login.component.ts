import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else{
      this.validateAllFormFields(this.loginForm);
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
  }
  inputValidation(controlName: string):string{
      return (this.loginForm.controls[controlName].errors &&
             (this.loginForm.controls[controlName].touched ||
              this.loginForm.controls[controlName].dirty)
              ?'input-form is-invalid':
              (this.loginForm.controls[controlName].touched ||
              this.loginForm.controls[controlName].dirty)
              ?'input-form is-valid border-green-600':'input-form');
  }

  getError(controlName: string): string {
    const control = this.loginForm.controls[controlName];
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
      case 'email':
        return 'Invalid email format';
      default:
        return '';
    }
  }
}
