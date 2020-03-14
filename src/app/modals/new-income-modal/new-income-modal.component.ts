import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryService} from '../../services/category-service/category.service';

@Component({
  selector: 'app-new-income-modal',
  templateUrl: './new-income-modal.component.html',
  styleUrls: ['./new-income-modal.component.scss']
})
export class NewIncomeModalComponent implements OnInit {

  incomeForm: FormGroup;
  availableCategories: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public dialogRef: MatDialogRef<NewIncomeModalComponent>,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {

    this.dialogRef.backdropClick().subscribe(() => {
      this.onCancelClick();
    });
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.onCancelClick();
      }
    });


    this.categoryService.getAll().subscribe(data => {
      this.availableCategories = data;
    });

    if (!this.row) {
      this.incomeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        date: new FormControl(''),
        amount: new FormControl('', Validators.required)
      })
    } else {
      this.incomeForm = new FormGroup({
        name: new FormControl(this.row.name, Validators.required),
        category: new FormControl(this.row.category.title, Validators.required),
        date: new FormControl(this.row.date),
        amount: new FormControl(this.row.amount, Validators.required)
      })
    }


  }

  createIncome() {
    this.dialogRef.close({
      id: this.row ? this.row.id : null,
      name: this.incomeForm.controls['name'].value,
      category: this.incomeForm.controls['category'].value,
      amount: this.incomeForm.controls['amount'].value,
      date: this.incomeForm.controls['date'].value === '' ?
        new Date().toISOString() :
        this.row ? this.incomeForm.controls['date'].value : this.incomeForm.controls['date'].value.toISOString()
    });
  }

  onCancelClick() {
    this.dialogRef.close({'cancelled': true})
  }



}
