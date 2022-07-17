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
      {label: 'Modificacion Usuario', value: 'USUARIO_MODIFICACION'},
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
      {label: 'Modificacion Pase', value: 'PASES_MODIFICACION'},
      {label: 'Eliminacion Pase', value: 'PASES_ELIMINACION'},
      
      {label:'Competencias', value: 'COMPETENCIAS'},
      {label:'Creacion Competencias', value: 'COMPETENCIAS_CREACION'},
      {label:'Modificacion Competencias', value: 'COMPETENCIAS_MODIFICACION'},
      {label:'Eliminacion Competencias', value:'COMPETENCIAS_ELIMINACION'},

      {label:'Jueces', value: 'JUEZ'},
      {label:'Creacion Arbitro', value: 'JUEZ_CREACION'},
      {label:'Modificacion Arbitro', value: 'JUEZ_MODIFICACION'},
      {label:'Eliminacion Arbitro', value:'JUEZ_ELIMINACION'},
      
      {label:'Asociaciones Dept.', value: 'ASOCIACION'},
      {label:'Creacion Asociacion', value:'ASOCIACION_DEP_CREACION'},
      {label:'Modificacion Asociacion', value:'ASOCIACION_DEP_MODIFICACION'},
      {label:'Eliminacion Asociacion', value:'ASOCIACION_DEP_ELIMINACION'},

      {label:'Partidos', value: 'PARTIDOS'},
      {label:'Creacion Partidos', value: 'PARTIDO_CREACION'},
      {label:'Modificacion Partido', value: 'PARTIDO_MODIFICACION'},
      {label:'Eliminacion Partido', value: 'PARTIDO_ELIMINACION'}
    ]
    return acciones;
  }
}
