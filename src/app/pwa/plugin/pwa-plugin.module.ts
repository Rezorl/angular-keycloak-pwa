import {Inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PLUGIN} from './plugin.token';
import {SwUpdateAppPlugin} from './sw-update-app.plugin';
import {DialogModule} from '../../dialog';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    {provide: PLUGIN, useClass: SwUpdateAppPlugin, multi: true},
  ]
})
export class PwaPluginModule {
  constructor(@Inject(PLUGIN) private plugins: any[]) { }
}
