import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Spending} from '../../models/spending';
import {IncomeService} from '../../services/income-service/income.service';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {NewSpendingModalComponent} from '../../modals/new-spending-modal/new-spending-modal.component';
import {NewIncomeModalComponent} from '../../modals/new-income-modal/new-income-modal.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

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

  displayedColumns: string[] = ['incomeId', 'incomeName', 'incomeCategory', 'incomeDate', 'incomeAmount', 'actions'];

  constructor(private incomeService: IncomeService,
              public dialog: MatDialog) { }

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
      this.incomeService.getAll().subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    } else if (param === 'week') {
      let date = new Date();
      this.toggleWeek();
      this.incomeService.getBetweenDates(new Date(date.setDate(date.getDate() - 7)), new Date()).subscribe(data => {
        //console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    } else if (param === 'month') {
      let date = new Date();
      this.toggleMonth();
      this.incomeService.getBetweenDates(new Date(date.setDate(date.getMonth() - 1)), new Date()).subscribe(data => {
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
            this.incomeService.getBetweenDates(data.dateFrom, data.dateTo).subscribe(data => {
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

  newIncome() {
    const dialogRef = this.dialog.open(NewIncomeModalComponent, {
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data.cancelled) {
          this.incomeService.saveIncome(data).subscribe(
            null,
            null,
            () => this.refreshDataSource()
          )
        }
      }
    );
  }

  editIncome(row) {
    const dialogRef = this.dialog.open(NewSpendingModalComponent, {
      data: row,
      width: '32rem'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data.cancelled) {
          this.incomeService.saveIncome(data).subscribe(
            null,
            null,
            () => this.refreshDataSource()
          )
        }
      }
    );
  }

  deleteIncome(row) {
    return this.incomeService.deleteIncome(row.id).subscribe(
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
      this.incomeService.getBetweenDates(this.specifiedDateFrom, this.specifiedDateTo).subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    }

  }

}
