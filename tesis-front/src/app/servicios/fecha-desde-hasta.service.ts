import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaDesdeHastaService {

  
  constructor() { }

  
  //se retorna las fechas de la siguiente forma: [fechaDesde, fechaHasta]
  public getFechaDesdeHastaSemanaActual():Date[]{ 
    const date : Date = new Date();
    const primerDia : Date= new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    const ultimoDia : Date= new Date(date.getFullYear(), date.getMonth(), primerDia.getDate() + 6);
    return [primerDia, ultimoDia];
  }

  public getFechaDesdeHastaMesActual():Date[]{
    const date : Date = new Date();
    const primerDia : Date = new Date(date.getFullYear(),date.getMonth(), 1);
    const ultimoDia : Date = new Date(date.getFullYear(),date.getMonth() + 1, 0);
    return [primerDia, ultimoDia];
  }

  public getFechaDesdeHastaAnioActual():Date[]{
    const date : Date = new Date();
    const primerDia : Date = new Date(date.getFullYear(),1,1);
    const ultimoDia : Date = new Date(date.getFullYear(), 11, 31);
    return [primerDia, ultimoDia];
  }

  public getFechaDesdeHastaUltimaSemana(): Date[] {
    const date : Date = new Date();
    const primerDia : Date = new Date(date.getFullYear(),date.getMonth(), date.getDate() - 6)
    const ultimoDia : Date = new Date(date.getFullYear(),date.getMonth(), date.getDate());
    return [primerDia, ultimoDia];
  }

  public getFechaDesdeHasta(fechaDesde : Date , fechaHasta :Date): Date[]{
    return [
      new Date(fechaDesde.getFullYear(), fechaDesde.getMonth(), fechaDesde.getDate(), 0,0,0,),
      new Date(fechaHasta.getFullYear(), fechaHasta.getMonth(), fechaHasta.getDate(), 23,59,59),
    ]
  }
}
