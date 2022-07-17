export class PartidoDto {
    
    fecha : Date;
    observaciones : string;
    idClubLocal : number;
    idClubVisitante : number;
    idJornada : number;

    constructor(
        fecha : Date,
        observaciones : string,
        idClubLocal : number,
        idClubVisitante : number,
        idJornada : number
    ){
        this.fecha = fecha;
        this.observaciones = observaciones;
        this.idClubLocal = idClubLocal;
        this.idClubVisitante = idClubVisitante;
        this.idJornada = idJornada;
    }
}
