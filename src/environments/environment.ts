import {KeycloakOptions} from 'keycloak-angular';

export const environment = {
  securityEnabled: true
};

export const keycloakOptions: KeycloakOptions = {
  config: {
    clientId: 'FILL_ME',
    realm: 'FILL_ME',
    url: 'http://localhost:8888/auth'
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  }
};
