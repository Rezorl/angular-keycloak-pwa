import {KeycloakService} from 'keycloak-angular';
import {keycloakOptions} from '../../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> => keycloak.init(keycloakOptions);
}
