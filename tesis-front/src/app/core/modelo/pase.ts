import { Club } from "./club";
import { Jugador } from "./jugador";

export interface Pase {
    id:number;
    jugador: Jugador;
    fechaParsed: Date;
    fechaDesdeParsed: Date;
    fechaHastaParsed: Date;
    edadEnPase :number;
    club : Club;
    motivo : string;
}
