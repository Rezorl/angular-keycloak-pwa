import {AppGuard} from '../../guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {OfflineAuthService} from '../service';

@Injectable()
export class OfflineGuard extends AppGuard {

  constructor(private readonly offlineAuthService: OfflineAuthService,
              private readonly router: Router) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (!this.offlineAuthService.isLoggedIn) {
      return this.router.navigate(['/login-required']);
    }
    return true;
  }
}
