// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  authURL : "http://localhost:8080/auth",
  recuperarPasswordURL: 'http://localhost:8080/email-password',
  usuariosURL: 'http://localhost:8080/usuarios',
  clubesURL: 'http://localhost:8080/clubes',
  logsURL: 'http://localhost:8080/logs',
  jugadoresURL: 'http://localhost:8080/jugadores',
  pasesJugadoresURL: 'http://localhost:8080/pases'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
