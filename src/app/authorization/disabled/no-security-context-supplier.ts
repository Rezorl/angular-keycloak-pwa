import {SecurityContextSupplier} from '../supplier';

export class NoSecurityContextSupplier extends SecurityContextSupplier {

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(true);
  }

  login(): Promise<void> {
    // not allowed
    throw new Error('You cant log in with security turned off');
  }

  logout(): Promise<void> {
    // not allowed
    throw new Error('you cant logout with security turned off');
  }

  get canLogout(): boolean {
    return false;
  }
}
