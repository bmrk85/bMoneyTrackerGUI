import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryService} from '../../services/category-service/category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-new-saving-modal',
  templateUrl: './new-saving-modal.component.html',
  styleUrls: ['./new-saving-modal.component.scss']
})
export class NewSavingModalComponent implements OnInit {


  savingForm: FormGroup;
  availableCategories: Category[];

  constructor(private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public saving: any,
              private dialogRef: MatDialogRef<NewSavingModalComponent>) {
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


    if (!this.saving) {
      this.savingForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dateFrom: new FormControl('', Validators.required),
        dateTo: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl(''),
        category: new FormControl('', Validators.required)
      });
    } else {
      this.savingForm = new FormGroup({
        name: new FormControl(this.saving.name, Validators.required),
        description: new FormControl(this.saving.description, Validators.required),
        dateFrom: new FormControl(this.saving.dateFrom, Validators.required),
        dateTo: new FormControl(this.saving.dateTo, Validators.required),
        amount: new FormControl(this.saving.amount, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
        newCategoryCheckbox: new FormControl(false),
        newCategory: new FormControl(''),
        category: new FormControl(this.saving.category.title, Validators.required)
      });
    }
    this.savingForm.controls['newCategory'].disable();

    this.onCategoryChanges();

  }

  onCategoryChanges(): void {
    this.savingForm.get('newCategoryCheckbox').valueChanges.subscribe(val => {
      if (val) {
        this.savingForm.controls['category'].disable();
        this.savingForm.controls['newCategory'].enable();
      } else {
        this.savingForm.controls['category'].enable();
        this.savingForm.controls['newCategory'].disable();
      }
    });
  }


  createSaving() {
    this.dialogRef.close({
      id: this.saving ? this.saving.id : null,
      name: this.savingForm.controls['name'].value,
      description: this.savingForm.controls['description'].value,
      dateFrom: this.savingForm.controls['dateFrom'].value,
      dateTo: this.savingForm.controls['dateTo'].value,
      amount: this.savingForm.controls['amount'].value,
      category: this.savingForm.controls['newCategoryCheckbox'].value ? this.savingForm.controls['newCategory'].value : this.savingForm.controls['category'].value,
      done: this.saving ? this.saving.done : false
    });
  }

  onCancelClick() {
    this.dialogRef.close({
      cancelled: true
    })
  }
}
