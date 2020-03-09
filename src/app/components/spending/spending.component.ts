import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SpendingService} from '../../services/spending-service/spending.service';
import {MatDialog} from '@angular/material/dialog';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {NewSpendingModalComponent} from '../../modals/new-spending-modal/new-spending-modal.component';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss'],

})
export class SpendingComponent implements OnInit {

  @ViewChild('dataTable', {static: false})
  dataTable: ElementRef;

  spendings = [];
  tableToggled = false;
  displayedColumns: string[] = ['spendingId', 'spendingName', 'spendingCategory', 'spendingDate', 'spendingAmount', 'actions'];

  constructor(private spendingService: SpendingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  getTotalCost() {
    return this.spendings.map(s => s.amount).reduce((acc, value) => acc + value, 0);
  }

  toggleTable(param: string) {
    this.spendings = [];

    if (this.tableToggled) {
      this.tableToggled = false;
    } else {
      if (param === 'all') {
        this.spendingService.getAll().subscribe(data => {
          // console.log(data);
          this.spendings = data;
          this.tableToggled = true;
        })
      } else if (param === 'week') {
        let date = new Date();
        this.spendingService.getBetweenDates(new Date(date.setDate(date.getDate() - 7)), new Date()).subscribe(data => {
          //console.log(data);
          this.spendings = data;
          this.tableToggled = true;
        })
      } else if (param === 'month') {
        let date = new Date();
        this.spendingService.getBetweenDates(new Date(date.setDate(date.getMonth() - 1)), new Date()).subscribe(data => {
          //  console.log(data);
          this.spendings = data;
          this.tableToggled = true;
        })
      } else if (param === 'specificDate') {
        const dialogRef = this.dialog.open(SpecificDateModalComponent, {
          width: '32rem'
        });
        dialogRef.afterClosed().subscribe(data => {
            //  console.log(data);
            if (!data.cancelled) {
              this.spendingService.getBetweenDates(data.dateFrom, data.dateTo).subscribe(data => {
                //   console.log(data);
                this.spendings = data;
                this.tableToggled = true;
              })
            } else {
              this.tableToggled = false;
            }
          }
        )
      }
    }
    this.dataTable.nativeElement.scrollIntoView();

  }

  newSpending() {
    const dialogRef = this.dialog.open(NewSpendingModalComponent, {
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(data =>{
      this.spendingService.saveSpending(data).subscribe();
    })
  }

  editSpending(row) {
    const dialogRef = this.dialog.open(NewSpendingModalComponent, {
      data: row,
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(data =>{
      this.spendingService.saveSpending(data).subscribe();
    })
  }
}
