import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleGeneralPartidoDto } from '../core/Dtos/partidos/detalle-general-partido-dto';
import { PartidoDto } from '../core/Dtos/partidos/partido-dto';
import { Anotacion } from '../core/modelo/anotacion';
import { JuezRol } from '../core/modelo/juez-rol';
import { JugadorPartido } from '../core/modelo/jugador-partido';
import { Partido } from '../core/modelo/partido';
import { Sustitucion } from '../core/modelo/sustitucion';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  partidosURL : string = environment.partidosURL;
  
  constructor(
    private httpClient : HttpClient
  ) { }

  public crearPartido(nuevoPartido : PartidoDto): Observable<any>{
    return this.httpClient.post<any>(`${this.partidosURL}/crear`,nuevoPartido);
  }

  public detallePartido(idPartido: number): Observable<Partido>{
    return this.httpClient.get<Partido>(`${this.partidosURL}/detalle/${idPartido}`);
  }

  public editarPartido(idPartido : number, editarPartido : PartidoDto):Observable<any>{
    return this.httpClient.put<any>(`${this.partidosURL}/editar/${idPartido}`,editarPartido);
  }

  public detalleDatosGeneralesPartido(idPartido : number): Observable<DetalleGeneralPartidoDto>{
    return this.httpClient.get<DetalleGeneralPartidoDto>(`${this.partidosURL}/${idPartido}/detalle-general`);
  }

  public eliminarPartido(idPartido : number): Observable<any>{
    return this.httpClient.delete<any>(`${this.partidosURL}/eliminar/${idPartido}`);
  }

  public establecerPartidoComoFinalizado(idPartido : number): Observable<any>{
    return this.httpClient.put<any>(`${this.partidosURL}/${idPartido}/finalizado`,null);
  }

  public establecerPartidoComoPendiente(idPartido : number): Observable<any>{
    return this.httpClient.put<any>(`${this.partidosURL}/${idPartido}/pendiente`,null);
  }

  public juecesDePartido(idPartido: number): Observable<JuezRol[]>{
    return this.httpClient.get<JuezRol[]>(`${this.partidosURL}/detalle/${idPartido}/jueces`);
  }

  public titularesDelClubLocal(idPartido : number) : Observable<JugadorPartido[]>{
    return this.httpClient.get<JugadorPartido[]>(`${this.partidosURL}/detalle/${idPartido}/club-local/titulares`);
  }

  public titularesDelClubVisitante(idPartido : number) : Observable<JugadorPartido[]>{
    return this.httpClient.get<JugadorPartido[]>(`${this.partidosURL}/detalle/${idPartido}/club-visitante/titulares`);
  }

  public suplentesDelClubLocal(idPartido : number) : Observable<JugadorPartido[]>{
    return this.httpClient.get<JugadorPartido[]>(`${this.partidosURL}/detalle/${idPartido}/club-local/suplentes`);
  }

  public suplentesDelClubVisitante(idPartido : number) : Observable<JugadorPartido[]>{
    return this.httpClient.get<JugadorPartido[]>(`${this.partidosURL}/detalle/${idPartido}/club-visitante/suplentes`);
  }

  public sustitucionesDelClubLocal(idPartido : number) : Observable<Sustitucion[]>{
    return this.httpClient.get<Sustitucion[]>(`${this.partidosURL}/detalle/${idPartido}/club-local/sustituciones`);
  }

  public sustitucionesDelClubVisitante(idPartido : number) : Observable<Sustitucion[]>{
    return this.httpClient.get<Sustitucion[]>(`${this.partidosURL}/detalle/${idPartido}/club-visitante/sustituciones`);
  }

  public anotacionesDelClubLocal(idPartido : number) : Observable<Anotacion[]>{
    return this.httpClient.get<Anotacion[]>(`${this.partidosURL}/detalle/${idPartido}/club-local/anotaciones`);
  }

  public anotacionesDelClubVisitante(idPartido : number) : Observable<Anotacion[]>{
    return this.httpClient.get<Anotacion[]>(`${this.partidosURL}/detalle/${idPartido}/club-visitante/anotaciones`);
  }

}
