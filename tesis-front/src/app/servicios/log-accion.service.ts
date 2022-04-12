import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogAccionService {

  constructor() { }

  public getAccionesLog() : {label: string, value: string}[] {
    const acciones = [
      {label: 'Usuarios', value:'USUARIO'},
      {label: 'Accesos al sistema', value: 'USUARIO_LOGIN'},
      {label: 'Creacion Usuario', value: 'USUARIO_CREACION'},
      {label: 'Alta Usuario', value: 'USUARIO_ALTA'},
      {label: 'Baja Usuario', value: 'USUARIO_BAJA'},
      {label: 'Error acceso al sistema', value: 'USUARIO_ERROR_LOGIN'},
      {label: 'Intento login usuario inactivo', value: 'USUARIO_ERROR_LOGIN_USUARIO_INACTIVO'},

      {label: 'Clubes', value: 'CLUBES'},
      {label: 'Creacion Club', value: 'CLUBES_CREACION'},
      {label: 'Modificacion Club', value: 'CLUBES_MODIFICACION'},
      {label: 'Eliminacion Club', value: 'CLUBES_ELIMINACION'},

      {label:'Jugadores', value: 'JUGADORES'},
      {label: 'Creacion Jugador', value: 'JUGADORES_CREACION'},
      {label: 'Modificacion Jugador', value: 'JUGADORES_MODIFICACION'},
      {label: 'Alta Jugador', value: 'JUGADORES_ALTA'},
      {label: 'Baja Jugador', value: 'JUGADORES_BAJA'},

      {label:'Pases', value: 'PASES'},
      {label: 'Creacion Pase', value: 'PASES_CREACION'},
      {label: 'Modificacion Pase', value: 'PASES_EDICION'},
      {label: 'Eliminacion Pase', value: 'PASES_ELIMINACION'},
      
      {label:'Torneos', value: 'TORNEOS'},
      {label:'Creacion Torneos', value: 'TORNEO_CREACION'},
      {label:'Modificacion torneo', value: 'TORNEO_ MODIFICACION'},
      {label:'Eliminacion torneo', value:'TORNEO_ELIMINACION'},

      {label:'Arbitros', value: 'ARBITROS'},
      {label:'Creacion Arbitro', value: 'ARBITRO_CREACION'},
      {label:'Modificacion Arbitro', value: 'ARBITRO_MODIFICACION'},
      {label:'Eliminacion Arbitro', value:'ARBITRO_ELIMINACION'},

      {label:'Partidos', value: 'PARTIDOS'},
      {label:'Creacion Partidos', value: 'CREACION_PARTIDOS'},
      {label:'Modificacion Partido', value: 'MODIFICACION_PARTIDO'},
    ]
    return acciones;
  }
}
