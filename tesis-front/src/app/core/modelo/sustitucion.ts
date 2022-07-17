import { Club } from "./club";
import { Jugador } from "./jugador";
import { Partido } from "./partido";

export class Sustitucion {
    id: number;
    partido : Partido;
    clubSustituye : Club;
    minuto : number;
    jugadorSale : Jugador;
    jugadorEntra : Jugador;

    constructor(id: number, partido: Partido, clubSustituye: Club, minuto: number, jugadorSale: Jugador, jugadorEntra : Jugador) {
        this.id = id;
        this.partido = partido;
        this.clubSustituye = clubSustituye;
        this.minuto = minuto;
        this.jugadorSale = jugadorSale;
        this.jugadorEntra = jugadorEntra;
    }
}
