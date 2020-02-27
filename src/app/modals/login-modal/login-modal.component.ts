import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MDBModalRef} from "angular-bootstrap-md";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";

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
              private modalRef: MDBModalRef) { }

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
        this.modalRef.hide();
      },
      error => {
        this.invalidLogin = true;
      });
  }

  onCancelClick() {
    this.modalRef.hide();
    this.action.next('No');
  }

}
