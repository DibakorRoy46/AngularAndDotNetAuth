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
    console.log(this.registerForm?.value);
  }

  getClassName(input:string):any{
    var returnType= "registerForm.get('"+input+"')?.errors"+
      "&& (registerForm.get('"+input+"')?.touched ||"+
    "registerForm.get('"+input+"')?.dirty)?"+
    "'input-form is-invalid  ' :"+
    "(registerForm.get('"+input+"')?.touched ||"+
    "registerForm.get('"+input+"')?.dirty) ?"+
    "' input-form is-valid border-green-600':"+
    "'input-form'";
    return returnType;
  }
}
