import { Jugador } from "src/app/core/modelo/jugador";
import { Pase } from "src/app/core/modelo/pase";

export interface DetalleJugadorDto {
    jugador : Jugador;
    historialClubes : Pase[]

}
