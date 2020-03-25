import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material';


export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}


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

  matcher = new CustomErrorStateMatcher();

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
      retypePassword: new FormControl('',
        [Validators.required, Validators.minLength(5), Validators.maxLength(32)],
      ),
    }, {validators: this.checkPasswords})
  }



  get username() {
    return this.registerForm.get('username')
  };

  get password() {
    return this.registerForm.get('password')
  };

  checkPasswords(form: FormGroup){
    return form.get('password').value !== form.get('retypePassword').value ? {notSame: true} : null;
  }


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

  onCancelClick() {
  }

}
