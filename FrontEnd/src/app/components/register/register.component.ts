import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
  }
  hideShowPassCon()
  {
    this.isTextCon=!this.isTextCon;
    this.isTextCon?this.eyeIconCon="fa-eye":this.eyeIconCon="fa-eye-slash";
    this.isTextCon? this.typeCon="text":this.typeCon="password";
  }
}
