export class EstadisticasGeneralesCompetencia{
    cantidadGolesLocales : number;
    cantidadGolesVisitantes : number;
    mediaGoles : number;
    victoriasLocales : number;
    victoriasVisitantes : number;
    empates : number;

    constructor(golesLocales : number, golesVisitantes : number, mediaGoles : number,victoriasLocales : number,victoriasVisitantes : number, empates : number){
        this.cantidadGolesLocales = golesLocales;
        this.cantidadGolesVisitantes = golesVisitantes;
        this.mediaGoles = mediaGoles;
        this.victoriasLocales = victoriasLocales;
        this.victoriasVisitantes = victoriasVisitantes;
        this.empates = empates;
    }
}
