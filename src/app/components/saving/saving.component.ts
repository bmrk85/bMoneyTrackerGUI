import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewSavingModalComponent} from '../../modals/new-saving-modal/new-saving-modal.component';
import {SavingService} from '../../services/saving-service/saving.service';
import {Saving} from '../../models/saving';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss']
})
export class SavingComponent implements OnInit {

  private savings: Saving[];

  constructor(private savingService: SavingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.savingService.getAll().subscribe(data => {
      this.savings = data;
    });
  }

  addSaving() {
    const dialogref = this.dialog.open(NewSavingModalComponent, {
      width: '32rem'
    });
    dialogref.afterClosed().subscribe(data => {
      if (!data.cancelled) {
        this.savingService.saveSaving(data).subscribe(
          null,
          null,
          () => {
            this.savingService.getAll().subscribe(data => {
              this.savings = data;
            })
          }
        );
      }
    });
  }

  editSaving(clickedSaving) {
    const dialogref = this.dialog.open(NewSavingModalComponent, {
      data: clickedSaving,
      width: '32rem'
    });
    dialogref.afterClosed().subscribe(data => {
      if (!data.cancelled) {
        this.savingService.saveSaving(data).subscribe(
          null,
          null,
          () => {
            this.savingService.getAll().subscribe(data => {
              this.savings = data;
            })
          }
        );
      }
    });
  }

  changeSavingStatus(clickedSaving){
    this.savingService.changeSavingStatus(clickedSaving).subscribe(null,null,()=>this.savingService.getAll().subscribe(data =>{
      this.savings = data;
    }));
  }

  deleteSaving(s) {
    this.savingService.deleteSaving(s.id).subscribe(null,null,()=>this.savingService.getAll().subscribe(data =>{
      this.savings = data;
    }));
  }
}
