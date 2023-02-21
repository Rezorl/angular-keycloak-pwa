import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../../storage';
import {KeycloakConfig, KeycloakProfile} from 'keycloak-js';
import {Router} from '@angular/router';
import {keycloakOptions} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class OfflineAuthService {

  private _headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*'
    }
  );

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly router: Router,
              private readonly http: HttpClient) { }

  get isLoggedIn(): boolean {
    return !!this.localStorageService.userInfo && !!this.localStorageService.token;
  }

  get userInfo(): KeycloakProfile {
    return this.localStorageService.userInfo;
  }

  get token(): string {
    return this.localStorageService.token;
  }

  updateToken() {
    const {url, realm, clientId} = keycloakOptions.config as KeycloakConfig;
    return this.http.post<any>(
      `${url}/realms/${realm}/protocol/openid-connect/token`,
      new URLSearchParams({'client_id': clientId, 'grant_type': 'refresh_token', 'refresh_token': this.localStorageService.refreshToken}),
      {headers: this._headers}
    ).pipe(
      tap(
        ({access_token, refresh_token}) =>
          this.localStorageService.updateToken({token: access_token, refreshToken: refresh_token})
      )
    )
  }
}
