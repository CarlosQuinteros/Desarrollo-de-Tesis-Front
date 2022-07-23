import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JugadorPartidoDto } from '../core/Dtos/participaciones-jugadores/jugador-partido-dto';
import { JugadorPartido } from '../core/modelo/jugador-partido';

@Injectable({
  providedIn: 'root'
})
export class JugadorPartidoService {

  participacionJugadoresURL: string = environment.jugadorPartidoURL
  constructor(
    private httpClient : HttpClient
  ) { }

  public crearTitular(nuevoTitular : JugadorPartidoDto):Observable<any>{
    return this.httpClient.post<any>(`${this.participacionJugadoresURL}/titular`, nuevoTitular);
  }

  public crearSuplente(nuevoSuplente : JugadorPartidoDto):Observable<any>{
    return this.httpClient.post<any>(`${this.participacionJugadoresURL}/suplente`, nuevoSuplente);
  }

  public editarParticipacion(participacionJugador : JugadorPartidoDto, idParticipacion : number):Observable<any>{
    return this.httpClient.put<any>(`${this.participacionJugadoresURL}/editar/${idParticipacion}`, participacionJugador);
  }

  public eliminarParticipacionJugador(idParticipacion : number):Observable<any>{
    return this.httpClient.delete<any>(`${this.participacionJugadoresURL}/eliminar/${idParticipacion}`);
  }

  public posiciones():Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.participacionJugadoresURL}/posiciones`);
  }
}
