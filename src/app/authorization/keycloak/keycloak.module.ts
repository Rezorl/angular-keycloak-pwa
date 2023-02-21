import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService} from 'keycloak-angular';
import {initializer} from './keycloak-initializer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeycloakUserSupplier} from './keycloak-user-supplier';
import {KeycloakSecurityContextSupplier} from './keycloak-security-context-supplier';
import {SecurityContextSupplier, UserContextSupplier} from '../supplier';
import {GenericKeycloakGuard, KeycloakLoginRequiredGuard} from './guard';
import {AppGuard, LoginRequiredGuard} from '../guard';

const KEYCLOAK_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: initializer,
  deps: [KeycloakService],
  multi: true
};

const KEYCLOAK_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    KEYCLOAK_INITIALIZER,
    KEYCLOAK_INTERCEPTOR,
    KeycloakService,
    {provide: AppGuard, useClass: GenericKeycloakGuard},
    {provide: LoginRequiredGuard, useClass: KeycloakLoginRequiredGuard},
    {provide: UserContextSupplier, useClass: KeycloakUserSupplier},
    {provide: SecurityContextSupplier, useClass: KeycloakSecurityContextSupplier},
  ]
})
export class KeycloakModule { }
