import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-specific-date-modal',
  templateUrl: './specific-date-modal.component.html',
  styleUrls: ['./specific-date-modal.component.scss']
})
export class SpecificDateModalComponent implements OnInit {

  dateForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<SpecificDateModalComponent>) {
  }

  ngOnInit() {
    this.dateForm = new FormGroup({
      dateFrom: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      dateTo: new FormControl('', {validators: Validators.required, updateOn: 'blur'})
    })
  }

  setDate() {
    const dateFrom = this.dateForm.controls['dateFrom'].value;
    const dateTo = this.dateForm.controls['dateTo'].value;
    this.dialogRef.close({
      'dateFrom': dateFrom,
      'dateTo': dateTo
    });
  }

  onCancelClick() {

  }
}
