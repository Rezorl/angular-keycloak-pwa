import { Component } from '@angular/core';
import {SecurityContextSupplier, UserContextSupplier} from './authorization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly $userName = this.userContextSupplier.username$()
  readonly canLogout = this.securityContextSupplier.canLogout;
  readonly isLoggedIn$ = this.securityContextSupplier.isLoggedIn();

  constructor(private readonly userContextSupplier: UserContextSupplier,
              private readonly securityContextSupplier: SecurityContextSupplier) {}

  logout() {
    this.securityContextSupplier.logout().then();
  }
}
