export class JugadorPartidoDto {
    idPartido : number;
    idJugador : number;
    idClub : number;
    nroCamiseta : number;
    posicion : string;

    constructor(idPartido : number, idJugador : number, idClub : number, nroCamiseta : number, posicion:string) {
        this.idPartido = idPartido;
        this.idJugador = idJugador;
        this.idClub = idClub;
        this.nroCamiseta = nroCamiseta;
        this.posicion = posicion;
    }
}
