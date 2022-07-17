import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompetenciaDto } from '../core/Dtos/competencias/competencia-dto';
import { Competencia } from '../core/modelo/competencia';
import { Jornada } from '../core/modelo/jornada';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {

  competenciasURL : string = environment.competenciasURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public crearCompetencia(nuevaCompetencia : CompetenciaDto):Observable<any>{
    return this.httpClient.post<any>(`${this.competenciasURL}/crear`, nuevaCompetencia);
  }

  public editarCompetencia(editarCompetencia : CompetenciaDto, idCompetencia : number):Observable<any>{
    return this.httpClient.put<any>(`${this.competenciasURL}/editar/${idCompetencia}`, editarCompetencia);
  }

  public detalleCompetencia(idCompetencia : number): Observable<Competencia>{
    return this.httpClient.get<any>(`${this.competenciasURL}/detalle/${idCompetencia}`);
  }

  public listadoCompetencias():Observable<Competencia[]>{
    return this.httpClient.get<Competencia[]>(`${this.competenciasURL}/listado`);
  }

  public eliminarCompetencia(idCompetencia : number): Observable<any>{
    return this.httpClient.delete<any>(`${this.competenciasURL}/eliminar/${idCompetencia}`);
  }

  public listadoJornadasDeCompetencia(idCompetencia: number): Observable<Jornada[]>{
    return this.httpClient.get<Jornada[]>(`${this.competenciasURL}/${idCompetencia}/jornadas`);
  }

  public listadoGoleadoresDeCompetencias(idCompetencia : number): Observable<any>{
    return this.httpClient.get<any>(`${this.competenciasURL}/${idCompetencia}/goleadores`);
  }

  public cantidadTotalCompetencias(): Observable<number>{
    return this.httpClient.get<number>(`${this.competenciasURL}/cantidad-total`);
  }

}
