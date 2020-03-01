import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  action: Subject<any> = new Subject();
  loginForm: FormGroup;
  invalidLogin = false;

  constructor(private router: Router,
              private authService: AuthService,
              public dialogRef: MatDialogRef<LoginModalComponent>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  tryLogin() {
    this.authService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      data => {
        this.invalidLogin = false;
        this.dialogRef.close();
      },
      error => {
        this.invalidLogin = true;
      });
  }


  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  onCancelClick() {
    this.dialogRef.close();
    this.action.next('No');
  }

}
