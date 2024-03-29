import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SpendingService} from '../../services/spending-service/spending.service';
import {MatDialog} from '@angular/material/dialog';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {NewSpendingModalComponent} from '../../modals/new-spending-modal/new-spending-modal.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Spending} from '../../models/spending';
import {MessageService} from '../../services/message-service/message.service';
import {Income} from '../../models/income';

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

  pieChartLabels: string[] = ['Category'];
  pieChartData: number[] = [100];
  pieChartType: string = 'pie';
  pieChartColors: any[] = [
    {backgroundColor: []}
  ];

  displayedColumns: string[] = ['spendingId', 'spendingName', 'spendingCategory', 'spendingDate', 'spendingAmount', 'actions'];
  probableSpending: number;
  spentLastMonth: number = 0;
  spentThisMonth: number = 0;

  constructor(private spendingService: SpendingService,
              public dialog: MatDialog,
              private messageService: MessageService) {
  }

  ngOnInit() {

    this.calculateProbableSpending();
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
        this.generatePieChartData(data);
      }, () => this.messageService.displayErrorMessage())
    } else if (param === 'week') {
      let date = new Date();
      this.toggleWeek();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getDate() - 7)), new Date()).subscribe(data => {
        //console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.generatePieChartData(data);
      }, () => this.messageService.displayErrorMessage())
    } else if (param === 'month') {
      let date = new Date();
      this.toggleMonth();
      this.spendingService.getBetweenDates(new Date(date.setDate(date.getMonth() - 1)), new Date()).subscribe(data => {
        //  console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.generatePieChartData(data);
      }, () => this.messageService.displayErrorMessage())
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
              this.generatePieChartData(data);
            }, () => this.messageService.displayErrorMessage());

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
            () => this.messageService.displayErrorMessage('spending'),
            () => {
              this.refreshDataSource();
              this.messageService.displaySuccessMessage('spending');
            }
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
            () => this.messageService.displayErrorMessage('spending'),
            () => {
              this.refreshDataSource();
              this.messageService.displaySuccessMessage('spending');
            }
          )
        }
      }
    );
  }

  deleteSpending(row) {
    return this.spendingService.deleteSpending(row.id).subscribe(
      null,
      () => this.messageService.displayErrorMessage('spending'),
      () => {
        this.refreshDataSource();
        this.messageService.displaySuccessMessage('spending');
      }
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
      },()=>this.messageService.displayErrorMessage())
    }

  }

  generatePieChartData(data: Spending[]){

    let amountsByCategory = new Map();

    data.forEach(i =>{
      if(!amountsByCategory.has(i.category.title)){
        amountsByCategory.set(`${i.category.title}+${i.category.color}`,-i.amount);
      }else{
        let currentAmount = amountsByCategory.get(i.category.title);
        amountsByCategory.set(`${i.category.title}+${i.category.color}`, currentAmount-i.amount);
      }
    });
    this.pieChartLabels = [];
    this.pieChartData = [];

    for(let [key,value] of amountsByCategory){
      this.pieChartColors[0].backgroundColor.push(key.split("+")[1]);
      this.pieChartLabels.push(key.split("+")[0]);
      this.pieChartData.push(value);
    }

  }


  applyFilter(event: KeyboardEvent ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private calculateProbableSpending() {

    let date = new Date();
    let previousMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);

    let previousMonth = new Date(date.getFullYear(), date.getMonth()-1, 1);
    previousMonth.setMonth(date.getMonth()-1);

    let currentMonthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.spendingService.getBetweenDates(previousMonth, previousMonthLastDay).subscribe(data => {
      data.forEach( spending => {
        this.spentLastMonth -= spending.amount;
      });
    }, null, ()=> {
      this.probableSpending = this.spentLastMonth;
      this.spendingService.getBetweenDates(currentMonthFirstDay, new Date()).subscribe(data => {
        data.forEach(spending => {
          this.probableSpending += spending.amount;
        });
      });
    });



  }




}
