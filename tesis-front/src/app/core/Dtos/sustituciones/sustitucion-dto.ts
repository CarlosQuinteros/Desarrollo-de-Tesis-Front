export class SustitucionDto {
    idPartido : number;
    idClubSustituye : number;
    idJugadorSale : number;
    idJugadorEntra : number;
    minuto : number;

    constructor(idPartido : number, idClubSustituye: number, idJugadorSale: number, idJugadorEntra: number, minuto: number) {
        this.idPartido = idPartido;
        this.idClubSustituye = idClubSustituye;
        this.idJugadorSale = idJugadorSale;
        this.idJugadorEntra = idJugadorEntra;
        this.minuto = minuto;

    }
}
