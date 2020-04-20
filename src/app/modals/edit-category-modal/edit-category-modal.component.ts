import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';

@Component( {
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
} )
export class EditCategoryModalComponent implements OnInit {

  categoryForm: FormGroup;

  constructor(
    @Inject( MAT_DIALOG_DATA ) public selectedCategory: Category,
    public dialogRef: MatDialogRef<EditCategoryModalComponent>
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


    this.categoryForm = new FormGroup( {
      title: new FormControl( this.selectedCategory.title, Validators.required ),
      isEnabled: new FormControl( this.selectedCategory.enabled, Validators.required ),
      color: new FormControl( this.selectedCategory.color, Validators.required )
    } );

  }

  saveCategory() {
    this.dialogRef.close( {
        title: this.categoryForm.controls['title'].value,
        enabled: this.categoryForm.controls['isEnabled'].value,
        color: this.categoryForm.controls['color'].value,
        id: this.selectedCategory.id
      }
    );
  }

  onCancelClick() {
    this.dialogRef.close({'cancelled': true})
  }
}
