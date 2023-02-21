import {NgModule} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {DialogService} from './dialog.service';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
    imports: [
        MatDialogModule,
        TranslateModule.forChild(),
        MatButtonModule
    ],
  providers: [DialogService]
})
export class DialogModule { }
