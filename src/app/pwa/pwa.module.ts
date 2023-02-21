import {isDevMode, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceWorkerModule} from '@angular/service-worker';
import {PwaPluginModule} from './plugin';

@NgModule({
  imports: [
    CommonModule,
    PwaPluginModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
})
export class PwaModule { }
