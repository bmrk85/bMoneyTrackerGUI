import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  action: Subject<any> = new Subject();
  registerForm: FormGroup;
  registrationError = false;
  succesfullyRegistered = false;
  minLength = 5;
  maxLength = 32;

  constructor(private authService: AuthService,
              public dialogRef: MatDialogRef<RegisterModalComponent>) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('',
        [Validators.required, Validators.minLength(5), Validators.maxLength(32)]),
      password: new FormControl('',
        [Validators.required, Validators.minLength(5), Validators.maxLength(32)],
        ),
    }, {updateOn: "blur"});
  }

  get username() { return this.registerForm.get('username')};
  get password() { return this.registerForm.get('password')};



    tryRegister() {
    this.authService.register(this.username.value, this.password.value)
      .subscribe(
        data => {
          this.registrationError = false;
          this.succesfullyRegistered = true;
          this.authService.authenticate(this.username.value, this.password.value)
            .subscribe();
          setTimeout(() => {
            this.dialogRef.close();
          }, 2000)
        },
        error => {
          this.registrationError = true;
        }
      )
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  onCancelClick() {
    this.dialogRef.close();
    this.action.next('No');
  }

}
