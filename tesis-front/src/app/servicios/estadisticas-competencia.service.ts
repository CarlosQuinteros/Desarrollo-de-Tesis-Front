import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { EstadisticasGeneralesCompetencia } from '../core/Dtos/competencias/estadisticas-generales-competencia';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasCompetenciaService {

  estadisticasCompetenciasURL : string = environment.estadisticasCompetenciasURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public estadisticasGenerales(id: number):Observable<EstadisticasGeneralesCompetencia>{
    return this.httpClient.get<EstadisticasGeneralesCompetencia>(`${this.estadisticasCompetenciasURL}/${id}/generales`);
  }
}
