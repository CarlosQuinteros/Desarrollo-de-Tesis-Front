export class DetalleGeneralPartidoDto {
  
  idPartido: number;
  fecha: Date;
  observaciones: string;
  estado: string;
  clubLocal: string;
  clubVisitante: string;
  cantidadGolesClubLocal: number;
  cantidadGolesClubVisitante: number;

  constructor(idPartido:number, fecha:Date, observaciones:string, estado:string, clubLocal:string, clubVisitante:string, cantidadGolesClubLocal:number, cantidadGolesClubVisitante:number){
    this.idPartido = idPartido;
    this.fecha = fecha;
    this.observaciones = observaciones;
    this.estado = estado;
    this.clubLocal = clubLocal;
    this.clubVisitante = clubVisitante;
    this.cantidadGolesClubLocal = cantidadGolesClubLocal
    this.cantidadGolesClubVisitante = cantidadGolesClubVisitante;
  }

  public cantidadGolesDelClubLocal():number | string{
    if(this.cantidadGolesClubLocal === 0 && this.cantidadGolesClubVisitante === 0 && this.estado === 'PENDIENTE'){
        return ' - ';
    }
    return this.cantidadGolesClubLocal;
  }

  public cantidadGolesDelClubVisitante():number | string{
    if(this.cantidadGolesClubLocal === 0 && this.cantidadGolesClubVisitante === 0 && this.estado === 'PENDIENTE'){
        return ' - ';
    }
    return this.cantidadGolesClubVisitante;
  }

}
