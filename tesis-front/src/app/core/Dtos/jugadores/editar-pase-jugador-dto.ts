export class EditarPaseJugadorDto {
    idJugador: number;
    idClub : number;
    fechaDesde : Date;
    fechaHasta : Date | null;
    motivo : string;

    constructor(idJugador: number, idClub: number, fechaDesde: Date, fechaHasta: Date | null, motivo: string) {
        this.idJugador = idJugador;
        this.idClub = idClub;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.motivo = motivo;
    }

}
