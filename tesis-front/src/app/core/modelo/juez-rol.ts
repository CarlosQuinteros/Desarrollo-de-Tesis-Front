import { Juez } from "./juez";
import { Partido } from "./partido";

export class JuezRol {
    id: number;
    juez: Juez;
    rol : string;
    partido : Partido;

    constructor(id: number, juez: Juez, rol: string, partido: Partido) {
        this.id = id;
        this.juez = juez;
        this.rol = rol;
        this.partido = partido;
    }
}
