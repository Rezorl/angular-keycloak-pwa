import {LoginRequiredGuard} from '../../guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class NoLoginRequiredGuard extends LoginRequiredGuard {

  constructor(private readonly router: Router) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.router.navigate(['']);
  }

}
