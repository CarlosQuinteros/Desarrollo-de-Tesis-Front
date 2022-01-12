import { Club } from "./club";
import { EstadoJugador } from "./estado-jugador";

export class Jugador {
    id? : number;
    nombre : string;
    apellidos : string;
    documento: string;
    fechaNacimientoParsed : Date = new Date();
    edadActual : number = 0;
    tarjetasAmarillasAcumuladas : number = 0;
    estadoJugador : EstadoJugador;
    clubActual : Club = new Club('','','');

    constructor(nombre : string, apellidos : string, documento: string, estadoJugador: EstadoJugador){
        this.nombre  = nombre;
        this.apellidos = apellidos;
        this.documento = documento;
        this.estadoJugador = estadoJugador;

    }

}
