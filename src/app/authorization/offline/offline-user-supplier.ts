import {Observable, of} from 'rxjs';
import {UserContextSupplier} from '../supplier';
import {Injectable} from '@angular/core';
import {OfflineAuthService} from './service';

@Injectable()
export class OfflineUserSupplier extends UserContextSupplier {

  constructor(private readonly offlineAuthService: OfflineAuthService) {
    super();
  }

  username$(): Observable<string> {
    return of(this.offlineAuthService.userInfo?.username);
  }
}
