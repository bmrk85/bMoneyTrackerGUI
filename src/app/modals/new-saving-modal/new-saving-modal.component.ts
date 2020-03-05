import { Component, OnInit } from '@angular/core';
import {SavingService} from "../../services/saving-service/saving.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-saving-modal',
  templateUrl: './new-saving-modal.component.html',
  styleUrls: ['./new-saving-modal.component.scss']
})
export class NewSavingModalComponent implements OnInit {


  savingForm: FormGroup;

  constructor(private savingService: SavingService) { }

  ngOnInit() {
    this.savingForm = new FormGroup({
      name: new FormControl('',Validators.required),
      dateFrom: new FormControl('',Validators.required),
      dateTo: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required)
    })
  }


  createSaving(){
    this.savingService.addSaving();
  }

  onCancelClick(e) {
    console.log(this.savingForm.getRawValue())
  }
}
