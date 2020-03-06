import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SpendingService} from '../../services/spending-service/spending.service';
import {MatDialog} from '@angular/material/dialog';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit {

  @ViewChild('dataTable', {static: false})
  dataTable: ElementRef;

  spendings = [];
  tableToggled = false;
  displayedColumns: string[] = ['spendingId', 'spendingName', 'spendingCategory', 'spendingDate', 'spendingAmount'];

  constructor(private spendingService: SpendingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  getTotalCost() {
    return this.spendings.map(s => s.amount).reduce((acc, value) => acc + value, 0);
  }

  toggleTable(param: string) {
    this.tableToggled = true;
    if (param === 'all') {
      this.spendingService.getAll().subscribe(data => {
        console.log(data);
        this.spendings = data;
      })
    } else if (param === 'week') {
      let date = new Date();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getDate() - 7)), new Date()).subscribe(data => {
        console.log(data);
        this.spendings = data;
      })


    } else if (param === 'month') {
      let date = new Date();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getMonth() - 1)), new Date()).subscribe(data => {
        console.log(data);
        this.spendings = data;
      })
    } else if (param === 'specificDate') {
      const dialogRef = this.dialog.open(SpecificDateModalComponent);
      dialogRef.afterClosed().subscribe(data =>
        this.spendingService.getBetweenDates(data.dateFrom, data.dateTo).subscribe(data => {
          console.log(data);
          this.spendings = data;
        })
      )
    }
    this.dataTable.nativeElement.scrollIntoView();

  }
}
