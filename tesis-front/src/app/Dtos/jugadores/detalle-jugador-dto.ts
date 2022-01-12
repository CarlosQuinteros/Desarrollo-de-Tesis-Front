import { Jugador } from "src/app/modelo/jugador";
import { Pase } from "src/app/modelo/pase";

export interface DetalleJugadorDto {
    jugador : Jugador;
    historialClubes : Pase[]

}
