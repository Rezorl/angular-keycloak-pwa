import {SecurityContextSupplier} from '../supplier';
import {Injectable} from '@angular/core';
import {OfflineAuthService} from './service';

@Injectable()
export class OfflineSecurityContextSupplier extends SecurityContextSupplier {

  constructor(private readonly offlineAuthService: OfflineAuthService) {
    super();
  }

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(this.offlineAuthService.isLoggedIn);
  }

  login(): Promise<void> {
    // not allowed
    throw new Error('You cannot log in while offline');
  }

  logout(): Promise<void> {
    // not allowed
    throw new Error('You cannot log out while offline');
  }

  get canLogout(): boolean {
    return false;
  }

}
