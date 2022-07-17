import { Club } from "./club";
import { Jornada } from "./jornada";

export class Partido {

    id: number;
    fecha : Date;
    observaciones : string;
    estado : string;
    clubLocal : Club;
    clubVisitante : Club;
    jornada : Jornada;

    constructor(
        id : number,
        fecha : Date,
        observaciones : string,
        estado : string,
        clubLocal : Club,
        clubVisitante : Club,
        jornada : Jornada
    ){
        this.id = id;
        this.fecha = fecha;
        this.observaciones = observaciones;
        this.estado = estado;
        this.clubLocal = clubLocal;
        this.clubVisitante = clubVisitante;
        this.jornada = jornada;
    }
}
