import { Club } from "./club";
import { Jugador } from "./jugador";
import { Partido } from "./partido";

export class JugadorPartido {
    id : number;
    partido : Partido;
    club : Club;
    jugador: Jugador;
    rol : string;
    posicion: string;
    edadEnPartido: number;

    constructor(id: number, partido: Partido,club: Club, jugador: Jugador, rol: string, posicion: string, edadEnPartido: number) {
        this.id = id;
        this.partido = partido;
        this.club = club;
        this.jugador = jugador;
        this.rol = rol;
        this.posicion = posicion;
        this.edadEnPartido = edadEnPartido;
    }
}
