import { Usuario } from "./usuario";

export class Log {
    id: number
    fecha : Date = new Date();
    usuario: Usuario
    logAccion :string
    descripcion: string
    objeto_id : number

    constructor(id: number, usuario: Usuario, logAccion: string, descripcion: string, objeto_id: number){
        this.id = id;
        this.usuario = usuario;
        this.logAccion = logAccion;
        this.descripcion = descripcion;
        this.objeto_id = objeto_id;
    }
}
