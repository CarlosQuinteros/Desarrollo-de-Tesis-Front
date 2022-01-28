import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, filter, reduce} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Log } from '../modelo/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logsURL = environment.logsURL;

  constructor(private httpClient: HttpClient) { }

  public listaLogs():Observable<Log[]>{
    return this.httpClient.get<Log[]>(`${this.logsURL}/listado`);
  }

  public listaLogsPorUsuario(idUsuario:number):Observable<Log[]>{
    return this.httpClient.get<Log[]>(`${this.logsURL}/actividadUsuario/${idUsuario}`);
  }

  public listaLogsPorUsername(userName : string):Observable<Log[]>{
    return this.httpClient.get<Log[]>(`${this.logsURL}/actividad/${userName}`);
  }
}
