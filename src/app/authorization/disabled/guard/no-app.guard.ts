import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppGuard} from '../../guard';

export class NoAppGuard extends AppGuard {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

}
