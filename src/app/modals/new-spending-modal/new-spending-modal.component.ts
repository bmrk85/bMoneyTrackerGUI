import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryService} from '../../services/category-service/category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-new-spending-modal',
  templateUrl: './new-spending-modal.component.html',
  styleUrls: ['./new-spending-modal.component.scss']
})
export class NewSpendingModalComponent implements OnInit {

  spendingForm: FormGroup;
  availableCategories: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public dialogRef: MatDialogRef<NewSpendingModalComponent>,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {

    this.categoryService.getAll().subscribe(data => {
      this.availableCategories = data;
    });

    if (!this.row) {
      this.spendingForm = new FormGroup({
        name: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        date: new FormControl(''),
        amount: new FormControl('', Validators.required)
      })
    } else {
      this.spendingForm = new FormGroup({
        name: new FormControl(this.row.name, Validators.required),
        category: new FormControl(this.row.category.title, Validators.required),
        date: new FormControl(''),
        amount: new FormControl(this.row.amount, Validators.required)
      })
    }


  }


  onCancelClick($event: MouseEvent) {

  }

  createSpending() {

    console.log(this.row);

    this.dialogRef.close({
      id: this.row ? this.row.id : null,
      name: this.spendingForm.controls['name'].value,
      category: this.spendingForm.controls['category'].value,
      amount: this.spendingForm.controls['amount'].value,
      date: this.spendingForm.controls['date'].value === '' ? new Date() : this.spendingForm.controls['date'].value
    });


  }
}
