import { Club } from "./club";
import { Jugador } from "./jugador";
import { Partido } from "./partido";

export class Anotacion {
    id: number;
    partido : Partido;
    jugador: Jugador;
    clubAnota : Club;
    minuto : number;
    tipoGol : string;

    constructor(id: number, partido: Partido,jugador: Jugador, clubAnota:Club, minuto: number, tipoGol: string){
        this.id = id;
        this.partido = partido;
        this.jugador = jugador;
        this.clubAnota = clubAnota;
        this.minuto = minuto;
        this.tipoGol = tipoGol;
    }
}
