import { Jornada } from "../../modelo/jornada";
import { DetalleGeneralPartidoDto } from "../partidos/detalle-general-partido-dto";

export class Jornadas {
    jornada : Jornada;
    partidos : DetalleGeneralPartidoDto[];

    constructor(jornada : Jornada, partidos : DetalleGeneralPartidoDto[]){
        this.jornada = jornada;
        this.partidos = partidos;
    }
}
