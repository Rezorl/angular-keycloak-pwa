import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogData} from './model';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {}

  public openDialog(data: DialogData) {
    return this.dialog.open(ConfirmationDialogComponent, {
        data,
        disableClose: true,
        autoFocus: false
      }
    );
  }
}
