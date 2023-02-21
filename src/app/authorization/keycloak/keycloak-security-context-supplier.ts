import {forkJoin, from, mergeMap, of, Subscription} from 'rxjs';
import {KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {Injectable, OnDestroy} from '@angular/core';
import {LocalStorageService} from '../../storage';
import {filter, map, tap} from 'rxjs/operators';
import {SecurityContextSupplier} from '../supplier';

@Injectable()
export class KeycloakSecurityContextSupplier extends SecurityContextSupplier implements OnDestroy {
  private readonly _subscription = new Subscription();

  constructor(private readonly keycloakService: KeycloakService,
              private readonly localStorageService: LocalStorageService) {
    super();
    this.initKeycloakEvents();
    this.saveAuthInfo();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private initKeycloakEvents() {
    this._subscription.add(
      this.keycloakService.keycloakEvents$
        .pipe(
          filter(evt => evt.type === KeycloakEventType.OnAuthLogout),
          tap(() => this.localStorageService.clear())
        ).subscribe()
    );
  }

  private saveAuthInfo(): void {
    from(this.keycloakService.isLoggedIn())
      .pipe(
        mergeMap(isLoggedIn => {
          if (isLoggedIn) {
            return forkJoin([this.keycloakService.loadUserProfile(), this.keycloakService.getToken()]).pipe(
              map(([userInfo, token]) => ({userInfo, token, refreshToken: this.keycloakService.getKeycloakInstance().refreshToken})),
              tap(authInfo => this.localStorageService.authInfo = authInfo)
            );
          }
          this.localStorageService.clear();
          return of(null);
        })
      ).subscribe();
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  login(): Promise<void> {
    return this.keycloakService.login({prompt: 'login'});
  }

  logout(): Promise<void> {
    this.localStorageService.clear();
    return this.keycloakService.logout('');
  }

  get canLogout(): boolean {
    return true;
  }
}
