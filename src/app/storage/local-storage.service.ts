
import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {StorageKey} from './storage-keys';
import {KeycloakProfile} from 'keycloak-js';
@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  set authInfo({userInfo, token, refreshToken}: {userInfo: KeycloakProfile, token: string, refreshToken: string}) {
    this.storage.set(StorageKey.USER_INFO, userInfo);
    this.updateToken({token, refreshToken});
  }

  updateToken({token, refreshToken}: {token: string, refreshToken: string}) {
    this.storage.set(StorageKey.TOKEN, token);
    this.storage.set(StorageKey.REFRESH_TOKEN, refreshToken);
  }

  get userInfo(): KeycloakProfile {
    return this.storage.get(StorageKey.USER_INFO);
  }

  get token(): string {
    return this.storage.get(StorageKey.TOKEN);
  }

  get refreshToken(): string {
    return this.storage.get(StorageKey.REFRESH_TOKEN);
  }

  public clear(): void {
    this.storage.clear();
  }
}
