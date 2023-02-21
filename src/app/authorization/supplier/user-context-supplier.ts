import {Observable} from 'rxjs';

export abstract class UserContextSupplier {
  abstract username$(): Observable<string>;
}
