import {LoginRequiredGuard} from '../../guard';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {OfflineAuthService} from '../service';

@Injectable()
export class OfflineLoginRequiredGuard extends LoginRequiredGuard {


  constructor(private readonly offlineAuthService: OfflineAuthService,
              private readonly router: Router) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.offlineAuthService.isLoggedIn) {
      return this.router.navigate(['']);
    }
    return true;
  }

}
