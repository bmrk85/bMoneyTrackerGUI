import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {CategoryService} from '../../services/category-service/category.service';
import {Category} from '../../models/category';
import {Spending} from '../../models/spending';
import {SpendingService} from '../../services/spending-service/spending.service';

@Component({
  selector: 'app-new-spending-modal',
  templateUrl: './new-spending-modal.component.html',
  styleUrls: ['./new-spending-modal.component.scss']
})
export class NewSpendingModalComponent implements OnInit {

  spendingForm: FormGroup;
  availableCategories: Category[];

  constructor(public dialogRef: MatDialogRef<NewSpendingModalComponent>,
              private categoryService: CategoryService,
              private spendingService: SpendingService) { }
  ngOnInit() {

    this.categoryService.getAll().subscribe(data =>{
      console.log(data);
      this.availableCategories = data;
    });

    this.spendingForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl(''),
      amount: new FormControl('', Validators.required)
    })

  }


  onCancelClick($event: MouseEvent) {
    
  }

  createSpending() {
    this.spendingService.saveSpending({
      id: 1,
      name: this.spendingForm.controls['name'].value,
      category: this.spendingForm.controls['category'].value,
      amount: this.spendingForm.controls['amount'].value,
      date: this.spendingForm.controls['date'].value === '' ? new Date() : this.spendingForm.controls['date'].value

    }).subscribe();

  }
}
