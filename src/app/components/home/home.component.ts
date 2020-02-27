import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {LoginModalComponent} from "../../modals/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../modals/register-modal/register-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: MDBModalRef;


  constructor(private authService: AuthService,
              private modalService: MDBModalService) {
  }

  ngOnInit() {
  }

  openLoginModal(){
    this.modalRef = this.modalService.show(LoginModalComponent);
    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }
  openRegisterModal(){
    this.modalRef = this.modalService.show(RegisterModalComponent);
    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }


}
