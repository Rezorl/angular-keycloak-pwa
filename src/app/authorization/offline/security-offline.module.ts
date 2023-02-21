import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppGuard, LoginRequiredGuard} from '../guard';
import {OfflineGuard, OfflineLoginRequiredGuard} from './guard';
import {SecurityContextSupplier, UserContextSupplier} from '../supplier';
import {OfflineSecurityContextSupplier} from './offline-security-context-supplier';
import {OfflineUserSupplier} from './offline-user-supplier';
import {OfflineAuthService} from './service';
import {TokenInterceptor} from './interceptor';

@NgModule({
  providers: [
    OfflineAuthService,
    {provide: AppGuard, useClass: OfflineGuard},
    {provide: LoginRequiredGuard, useClass: OfflineLoginRequiredGuard},
    {provide: SecurityContextSupplier, useClass: OfflineSecurityContextSupplier},
    {provide: UserContextSupplier, useClass: OfflineUserSupplier},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class SecurityOfflineModule {}
