# AngularKeycloakPwa
After logging in, the user's data is saved in the browser's memory.
When localhost:4200 is launched in offline mode, data about the user/token,
etc. are downloaded from the browser's memory.
When you log out, the browser's memory is cleared.
## How to run 
Fill [keycloakOptions](src%2Fenvironments%2Fenvironment.ts)
```
npm install -g http-server
ng build --configuration production
http-server -p 4200 -c-1 dist/keycloak-angular-pwa
```
