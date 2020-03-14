import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SpendingService} from '../../services/spending-service/spending.service';
import {MatDialog} from '@angular/material/dialog';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {NewSpendingModalComponent} from '../../modals/new-spending-modal/new-spending-modal.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Spending} from '../../models/spending';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss'],

})
export class SpendingComponent implements OnInit {

  @ViewChild('dataTable', {static: true})
  dataTable: ElementRef;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  dataSource = new MatTableDataSource<Spending>();

  tableToggled = false;
  allToggled = false;
  weekToggled = false;
  monthToggled = false;
  specificToggled = false;
  specifiedDateFrom: any;
  specifiedDateTo: any;

  displayedColumns: string[] = ['spendingId', 'spendingName', 'spendingCategory', 'spendingDate', 'spendingAmount', 'actions'];

  constructor(private spendingService: SpendingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  getTotalCost() {
    return this.dataSource.data.map(s => s.amount).reduce((acc, value) => acc + value, 0);
  }

  toggleTable(param: string, refresh?: boolean) {
    if (!refresh && param !== 'specificDate') {
      this.tableToggled = !this.tableToggled;
    }
    if (param === 'all') {
      this.toggleAll();
      this.spendingService.getAll().subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    } else if (param === 'week') {
      let date = new Date();
      this.toggleWeek();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getDate() - 7)), new Date()).subscribe(data => {
        //console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    } else if (param === 'month') {
      let date = new Date();
      this.toggleMonth();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getMonth() - 1)), new Date()).subscribe(data => {
        //  console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    } else if (param === 'specificDate' && !this.tableToggled) {
      const dialogRef = this.dialog.open(SpecificDateModalComponent, {
        width: '32rem'
      });
      dialogRef.afterClosed().subscribe(data => {
          //  console.log(data);
          if (!data.cancelled) {
            this.specifiedDateFrom = data.dateFrom;
            this.specifiedDateTo = data.dateTo;
            this.toggleSpecificDate();
            this.spendingService.getBetweenDates(data.dateFrom, data.dateTo).subscribe(data => {
              //   console.log(data);
              this.dataSource.data = data;
              this.dataSource.paginator = this.paginator;
            });

            this.tableToggled = true;
          } else {
            this.tableToggled = false;
          }
        }
      )
    } else {
      this.tableToggled = !this.tableToggled;
    }

    this.dataTable.nativeElement.scrollIntoView();

  }

  newSpending() {
    const dialogRef = this.dialog.open(NewSpendingModalComponent, {
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data.cancelled) {
          this.spendingService.saveSpending(data).subscribe(
            null,
            null,
            () => this.refreshDataSource()
          )
        }
      }
    );
  }

  editSpending(row) {
    const dialogRef = this.dialog.open(NewSpendingModalComponent, {
      data: row,
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data.cancelled) {
          this.spendingService.saveSpending(data).subscribe(
            null,
            null,
            () => this.refreshDataSource()
          )
        }
      }
    );
  }

  deleteSpending(row) {
    return this.spendingService.deleteSpending(row.id).subscribe(
      null,
      null,
      () => this.refreshDataSource()
    );
  }

  private toggleAll() {
    this.weekToggled = false;
    this.monthToggled = false;
    this.specificToggled = false;
    this.allToggled = true;
  }

  private toggleWeek() {
    this.monthToggled = false;
    this.specificToggled = false;
    this.allToggled = false;
    this.weekToggled = true;

  }

  private toggleMonth() {
    this.weekToggled = false;
    this.specificToggled = false;
    this.allToggled = false;
    this.monthToggled = true;
  }

  private toggleSpecificDate() {
    this.weekToggled = false;
    this.monthToggled = false;
    this.allToggled = false;
    this.specificToggled = true;
  }

  private refreshDataSource() {
    if (this.allToggled) {
      this.toggleTable('all', true);
    } else if (this.monthToggled) {
      this.toggleTable('month', true);
    } else if (this.weekToggled) {
      this.toggleTable('week', true);
    } else if (this.specificToggled) {
      this.spendingService.getBetweenDates(this.specifiedDateFrom, this.specifiedDateTo).subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    }

  }


}
