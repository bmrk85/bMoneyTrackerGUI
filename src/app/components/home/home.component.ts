import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../modals/register-modal/register-modal.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(public authService: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openLoginModal(){
    // this.modalRef = this.modalService.show(LoginModalComponent);
    // this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
    this.dialog.open(LoginModalComponent, {
      width:'32rem'
    })
  }
  openRegisterModal(){
    this.dialog.open(RegisterModalComponent,{
      width:'32rem'
    })
    // this.modalRef = this.modalService.show(RegisterModalComponent);
    // this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }

}
