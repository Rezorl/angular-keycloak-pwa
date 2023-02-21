import {Observable, of} from 'rxjs';
import {UserContextSupplier} from '../supplier';

export class NoUserSupplier extends UserContextSupplier {
  private static readonly ANONYMOUS_USER_LOGIN = 'Anonymous_user';

  username$(): Observable<string> {
    return of(NoUserSupplier.ANONYMOUS_USER_LOGIN);
  }
}
