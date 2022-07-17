import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JornadaDto } from '../core/Dtos/jornadas/jornada-dto';
import { DetalleGeneralPartidoDto } from '../core/Dtos/partidos/detalle-general-partido-dto';
import { Jornada } from '../core/modelo/jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {

  jornadasURL: string = environment.jornadaURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public crearJornada(nuevaJornada : JornadaDto): Observable<any>{
    return this.httpClient.post(`${this.jornadasURL}/crear`, nuevaJornada);
  }

  public editarJornada(editarJornada : JornadaDto, idJornada:number): Observable<any>{
    return this.httpClient.put(`${this.jornadasURL}/editar/${idJornada}`,editarJornada);
  }

  public detalleJornada(idJornada:number): Observable<Jornada>{
    return this.httpClient.get<Jornada>(`${this.jornadasURL}/detalle/${idJornada}`);
  }

  public listadoPartidosDeJornada(idJornada:number): Observable<DetalleGeneralPartidoDto[]>{
    return this.httpClient.get<DetalleGeneralPartidoDto[]>(`${this.jornadasURL}/${idJornada}/partidos`);
  }

  public eliminarJornada(idJornada : number): Observable<any>{
    return this.httpClient.delete<any>(`${this.jornadasURL}/eliminar/${idJornada}`);
  }
}
