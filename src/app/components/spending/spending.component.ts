import {Component, OnInit} from '@angular/core';
import {SpendingService} from '../../services/spending-service/spending.service';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit {

  showAll = false;
  showThisMonth = false;
  showThisWeek = false;

  constructor(private spendingService: SpendingService) {
  }

  ngOnInit() {
  }

  toggleAll() {
    this.showThisWeek = false;
    this.showThisMonth = false;
    this.showAll = true;

    this.spendingService.getAll().subscribe(data =>{
      console.log(data);
    })




  }

  toggleThisMonth() {
    this.showThisWeek = false;
    this.showAll = false;
    this.showThisMonth = true;
  }

  toggleThisWeek() {
    this.showAll = false;
    this.showThisMonth = false;
    this.showThisWeek = true;

  }


}
