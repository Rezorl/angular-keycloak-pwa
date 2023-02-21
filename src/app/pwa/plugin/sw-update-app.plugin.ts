import {Injectable, OnDestroy} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {mergeMap, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {DialogService} from '../../dialog';

@Injectable()
export class SwUpdateAppPlugin implements OnDestroy {
  private _subscription = new Subscription();

  constructor(private readonly swUpdate: SwUpdate,
              private readonly dialogService: DialogService) {
    this.initSwUpdate();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  initSwUpdate() {
    this._subscription.add(
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        mergeMap(() => this.dialogService.openDialog({
            title: 'dialog.new-version.title',
            message: 'dialog.new-version.message',
            confirmButton: 'dialog.new-version.buttons.confirm',
            rejectButton: 'dialog.new-version.buttons.reject'
          }).afterClosed()
        ),
        filter(result => result)
      ).subscribe(() => window.location.reload())
    );
  }

}
