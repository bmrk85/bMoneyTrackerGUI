import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-spending-modal',
  templateUrl: './new-spending-modal.component.html',
  styleUrls: ['./new-spending-modal.component.scss']
})
export class NewSpendingModalComponent implements OnInit {

  spendingForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewSpendingModalComponent>) { }

  ngOnInit() {

    this.spendingForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    })

  }


  onCancelClick($event: MouseEvent) {
    
  }

  createSpending() {

  }
}
