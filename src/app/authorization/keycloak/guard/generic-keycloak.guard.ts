import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {AppGuard} from '../../guard';

@Injectable()
export class GenericKeycloakGuard extends KeycloakAuthGuard implements AppGuard {

  constructor(router: Router,
              private keycloakService: KeycloakService) {
    super(router, keycloakService);
  }

  async isAccessAllowed(route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloakService.login();
    }
    return Promise.resolve(true);
  }

}
