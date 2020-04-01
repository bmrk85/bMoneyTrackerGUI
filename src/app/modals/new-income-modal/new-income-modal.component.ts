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
  availableCategories: Category[] = [];

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
      data.forEach(c => {
        if (c.enabled) {
          this.availableCategories.push(c)
        }
      });
    });

    if (!this.row) {
      this.incomeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl(''),
        category: new FormControl('', Validators.required),
        date: new FormControl(''),
        amount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])
      })
    } else {
      this.incomeForm = new FormGroup({
        name: new FormControl(this.row.name, Validators.required),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl(''),
        category: new FormControl(this.row.category.title, Validators.required),
        date: new FormControl(this.row.date),
        amount: new FormControl(this.row.amount, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')])
      })
    }
    this.incomeForm.controls['newCategory'].disable();
    this.onCategoryChanges();
  }


  onCategoryChanges(): void {
    this.incomeForm.get('newCategoryCheckbox').valueChanges.subscribe(val => {
      if (val) {
        this.incomeForm.controls['category'].disable();
        this.incomeForm.controls['newCategory'].enable();
      } else {
        this.incomeForm.controls['category'].enable();
        this.incomeForm.controls['newCategory'].disable();
      }
    });
  }


  createIncome() {
    const selectedCategory = this.availableCategories.find( cat => cat.id === this.incomeForm.controls['category'].value );

    this.dialogRef.close({
      id: this.row ? this.row.id : null,
      name: this.incomeForm.controls['name'].value,
      categoryTitle: this.incomeForm.controls['newCategoryCheckbox'].value ?
        this.incomeForm.controls['newCategory'].value
        :
        selectedCategory.title,
      categoryEnabled: this.incomeForm.controls['newCategoryCheckbox'].value ?
        true
        :
        selectedCategory.enabled,
      categoryColor: this.incomeForm.controls['newCategoryCheckbox'].value ?
        '#' + Math.floor( Math.random() * 16777215 ).toString( 16 )
        :
        selectedCategory.color,
      categoryId: this.incomeForm.controls['newCategoryCheckbox'].value ?
        null
        :
        selectedCategory.id,
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
