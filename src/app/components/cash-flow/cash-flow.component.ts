import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Spending} from '../../models/spending';
import {SpecificDateModalComponent} from '../../modals/specific-date-modal/specific-date-modal.component';
import {CashFlow} from '../../models/cash-flow';
import {CashFlowService} from '../../services/cash-flow-service/cash-flow.service';

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

  dataSource = new MatTableDataSource<Spending>();

  tableToggled = false;
  specificToggled = false;
  specifiedDateFrom: any;
  specifiedDateTo: any;

  displayedColumns: string[] = ['id', 'name', 'category', 'date', 'amount'];

  constructor(private cashFlowService: CashFlowService,
              private dialog: MatDialog) { }

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
              data.sort((a,b) => (a.date > b.date) ? 1 : -1);
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

}
