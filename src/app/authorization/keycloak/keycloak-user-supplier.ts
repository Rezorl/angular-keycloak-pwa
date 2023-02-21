import {UserContextSupplier} from '../supplier';
import {from, mergeMap, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {map, shareReplay} from 'rxjs/operators';
import {KeycloakProfile} from 'keycloak-js';

@Injectable()
export class KeycloakUserSupplier extends UserContextSupplier {
  private readonly _userProfile$: Observable<KeycloakProfile> = from(this.keycloakService.isLoggedIn())
    .pipe(
      mergeMap(isLoggedIn => isLoggedIn ? this.keycloakService.loadUserProfile() : of({})),
      shareReplay(1)
    );

  constructor(private readonly keycloakService: KeycloakService) {
    super();
  }

  username$(): Observable<string> {
    return this._userProfile$.pipe(map(({username}) => username));
  }

}
