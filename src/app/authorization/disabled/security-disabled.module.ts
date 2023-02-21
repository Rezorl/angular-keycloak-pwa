import {NgModule} from '@angular/core';
import {NoUserSupplier} from './no-user-supplier';
import {SecurityContextSupplier, UserContextSupplier} from '../supplier';
import {NoSecurityContextSupplier} from './no-security-context-supplier';
import {AppGuard, LoginRequiredGuard} from '../guard';
import {NoAppGuard, NoLoginRequiredGuard} from './guard';

@NgModule({
  providers: [
    {provide: UserContextSupplier, useClass: NoUserSupplier},
    {provide: SecurityContextSupplier, useClass: NoSecurityContextSupplier},
    {provide: AppGuard, useClass: NoAppGuard},
    {provide: LoginRequiredGuard, useClass: NoLoginRequiredGuard}
  ]
})
export class SecurityDisabledModule { }
