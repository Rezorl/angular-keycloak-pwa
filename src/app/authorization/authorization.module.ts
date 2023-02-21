import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeycloakModule} from './keycloak';
import {SecurityDisabledModule} from './disabled';
import {SecurityOfflineModule} from './offline';
import {StorageModule} from '../storage';
import {environment} from '../../environments/environment';

let SecurityModule = [environment.securityEnabled ? KeycloakModule : SecurityDisabledModule];

// A value for 'navigator' cannot be determined statically, as it is an external declaration.
// you cannot write conditions using the navigator in the module's 'imports' property
if (!navigator.onLine && environment.securityEnabled) {
  SecurityModule = [SecurityOfflineModule];
}

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    StorageModule
  ]
})
export class AuthorizationModule { }
