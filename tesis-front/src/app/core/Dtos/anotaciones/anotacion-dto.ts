export class AnotacionDto {
    idPartido : number;
    idClubAnota : number;
    idJugadorAnota : number;
    minuto : number;
    tipoGol : string;

    constructor(idPartido : number, idClubAnota : number, idJugadorAnota : number, minuto : number, tipoGol : string) {
        this.idPartido = idPartido;
        this.idClubAnota = idClubAnota;
        this.idJugadorAnota = idJugadorAnota;
        this.minuto = minuto;
        this.tipoGol = tipoGol;
    }
}
