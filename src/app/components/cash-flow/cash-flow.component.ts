import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';

import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {CashFlow} from '../../models/cash-flow';
import {CashFlowService} from '../../services/cash-flow-service/cash-flow.service';
import {MessageService} from '../../services/message-service/message.service';

@Component({
  selector: 'app-cashFlow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  @ViewChild('dataTable', {static: true})
  dataTable: ElementRef;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  dataSource = new MatTableDataSource<CashFlow>();

  pieChartLabels: string[] = ['Spending', 'Income'];
  pieChartData: number[] = [50, 50];
  pieChartType: string = 'pie';
  pieChartColors: any[] = [
    {backgroundColor: ['#FFA07A', '#98FB98']}
  ];

  tableToggled = false;
  specificToggled = false;
  specifiedDateFrom: any;
  specifiedDateTo: any;

  displayedColumns: string[] = ['id', 'name', 'category', 'date', 'amount'];


  constructor(private cashFlowService: CashFlowService,
              private dialog: MatDialog,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  getTotalCost() {
    return this.dataSource.data.map(s => s.amount).reduce((acc, value) => acc + value, 0);
  }

  toggleTable() {
    if (!this.tableToggled) {
      const dialogRef = this.dialog.open(SpecificDateModalComponent, {
        width: '32rem'
      });
      dialogRef.afterClosed().subscribe(data => {
          //  console.log(data);
          if (!data.cancelled) {
            this.specifiedDateFrom = data.dateFrom;
            this.specifiedDateTo = data.dateTo;
            this.specificToggled = true;
            this.cashFlowService.getBetweenDates(data.dateFrom, data.dateTo).subscribe((data: CashFlow[]) => {
              //   console.log(data);
              data.sort((a, b) => (a.date > b.date) ? 1 : -1);
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

  generatePieChartData(data: CashFlow[]) {
    let totalIncome = 0;
    let totalSpending = 0;

    data.forEach(c => {
      if (c.amount < 0) {
        totalSpending += -c.amount;
      } else {
        totalIncome += c.amount;
      }
    });

    this.pieChartData = [totalSpending, totalIncome];
  }

  createXls() {
    this.cashFlowService.sendDatasourceData(this.dataSource.data).subscribe(data => {
      const blob = new Blob([data], {type: 'application/vnd.ms-excel'});
      window.open(window.URL.createObjectURL(blob));
    }, () => this.messageService.displayCustomMessage('Error downloading excel file'));
  }


}
