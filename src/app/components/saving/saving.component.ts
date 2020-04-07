import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NewSavingModalComponent} from '../../modals/new-saving-modal/new-saving-modal.component';
import {SavingService} from '../../services/saving-service/saving.service';
import {Saving} from '../../models/saving';
import {MessageService} from '../../services/message-service/message.service';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss']
})
export class SavingComponent implements OnInit {

  public savings: Saving[];

  constructor(private savingService: SavingService,
              public dialog: MatDialog,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.savingService.getAll().subscribe(data => {
      this.savings = data;
    }, ()=>this.messageService.displayErrorMessage());
  }

  addSaving() {
    const dialogref = this.dialog.open(NewSavingModalComponent, {
      width: '32rem'
    });
    dialogref.afterClosed().subscribe(data => {
      if (!data.cancelled) {
        this.savingService.saveSaving(data).subscribe(
          null,
          () => this.messageService.displayErrorMessage('saving'),
          () => {
            this.savingService.getAll().subscribe(data => {
              this.savings = data;
            });
            this.messageService.displaySuccessMessage('saving')
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
          () => this.messageService.displayErrorMessage('saving'),
          () => {
            this.savingService.getAll().subscribe(data => {
              this.savings = data;
            });
            this.messageService.displaySuccessMessage('saving')
          }
        );
      }
    });
  }

  changeSavingStatus(clickedSaving) {
    this.savingService.changeSavingStatus(clickedSaving).subscribe(
      null,
      () =>this.messageService.displayErrorMessage('status'),
      () => {
        this.savingService.getAll().subscribe(data => {
          this.savings = data;
        });
        this.messageService.displaySuccessMessage('status')
      }
    );
  }

  deleteSaving(s) {
    this.savingService.deleteSaving(s.id).subscribe(
      null,
      () => this.messageService.displayErrorMessage('saving'),
      () => {
        this.savingService.getAll().subscribe(data => {
          this.savings = data;
        });
        this.messageService.displaySuccessMessage('saving')
      });
  }
}
