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
      this.spendingForm = new FormGroup({
        name: new FormControl('', Validators.required),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl(''),
        category: new FormControl('', Validators.required),
        date: new FormControl(''),
        amount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])
      })
    } else {
      this.spendingForm = new FormGroup({
        name: new FormControl(this.row.name, Validators.required),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl('', Validators.required),
        category: new FormControl(this.row.category.title, Validators.required),
        date: new FormControl(this.row.date),
        amount: new FormControl(this.row.amount, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])
      })
    }
    this.spendingForm.controls['newCategory'].disable();
    this.onCategoryChanges();

  }

  onCategoryChanges(): void {
    this.spendingForm.get('newCategoryCheckbox').valueChanges.subscribe(val => {
      if (val) {
        this.spendingForm.controls['category'].disable();
        this.spendingForm.controls['newCategory'].enable();
      } else {
        this.spendingForm.controls['category'].enable();
        this.spendingForm.controls['newCategory'].disable();
      }
    });
  }

  createSpending() {

    this.dialogRef.close({
      id: this.row ? this.row.id : null,
      name: this.spendingForm.controls['name'].value,
      category: this.spendingForm.controls['newCategoryCheckbox'].value ? this.spendingForm.controls['newCategory'].value : this.spendingForm.controls['category'].value,
      amount: this.spendingForm.controls['amount'].value,
      date: this.spendingForm.controls['date'].value === '' ?
        new Date().toISOString() :
        this.row ? this.spendingForm.controls['date'].value : this.spendingForm.controls['date'].value.toISOString()
    });
  }

  onCancelClick() {
    this.dialogRef.close({'cancelled': true})
  }


}
