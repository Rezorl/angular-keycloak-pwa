export abstract class SecurityContextSupplier {
  abstract isLoggedIn(): Promise<boolean>;
  abstract login(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract get canLogout(): boolean;
}
