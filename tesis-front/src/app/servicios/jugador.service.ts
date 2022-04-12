import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambioDeClubDto } from 'src/app/core/Dtos/jugadores/cambio-de-club-dto';
import { EditarJugador } from 'src/app/core/Dtos/jugadores/editar-jugador';
import { NuevoJugadorDto } from 'src/app/core/Dtos/jugadores/nuevo-jugador-dto';
import { Jugador } from 'src/app/core/modelo/jugador';
import { EditarPaseJugadorDto } from '../core/Dtos/jugadores/editar-pase-jugador-dto';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  jugadoresURL = environment.jugadoresURL;

  constructor(private httpClient : HttpClient) { }

  public listaJugadores():Observable<Jugador[]>{
    return this.httpClient.get<Jugador[]>(`${this.jugadoresURL}/listado`);
  }

  public detalleJugador(id: number):Observable<any>{
    return this.httpClient.get<any>(`${this.jugadoresURL}/detalle/${id}`)
  }

  public detalleJugadorPorDni(dni : string):Observable<any>{
    return this.httpClient.get<any>(`${this.jugadoresURL}/detalle/dni/${dni}`);
  }

  public editarJugador(id: number, editarJugador : EditarJugador):Observable<any>{
    return this.httpClient.put<any>(`${this.jugadoresURL}/editar/${id}`,editarJugador);
  }

  public historialClubes(id : number): Observable<any>{
    return this.httpClient.get<any>(`${this.jugadoresURL}/historialClubes/${id}`)
  }

  public crearJugador(nuevoJugadorDto : NuevoJugadorDto):Observable<any> {
    return this.httpClient.post<any>(`${this.jugadoresURL}/crear`, nuevoJugadorDto);
  }

  public altaJugador(id : number): Observable<any> {
    return this.httpClient.put<any>(`${this.jugadoresURL}/altaJugador/${id}`, id);
  }

  public bajaJugador(id : number): Observable<any> {
    return this.httpClient.put<any>(`${this.jugadoresURL}/bajaJugador/${id}`,id);
    
  }

  public jugadoresActualesPorClub(idClub : number): Observable<Jugador[]> {
    return this.httpClient.get<Jugador[]>(`${this.jugadoresURL}/club/${idClub}`);
  }

  public exJugadoresPorClub(idClub : number): Observable<Jugador[]> {
    return this.httpClient.get<Jugador[]>(`${this.jugadoresURL}/exjugadores/club/${idClub}`);
  }

  public cantidadTotalJugadores():Observable<number>{
    return this.httpClient.get<number>(`${this.jugadoresURL}/cantidadTotal`);
  }

  public crearNuevoPase(nuevoPaseDto : CambioDeClubDto): Observable<any>{
    return this.httpClient.post<any>(`${this.jugadoresURL}/pases/nuevo`, nuevoPaseDto);
  }

  public eliminarPase(id : number): Observable<any> {
    return this.httpClient.delete<any>(`${this.jugadoresURL}/pases/eliminar/${id}`);
  }

  public editarPase(id: number, editarPaseDto : EditarPaseJugadorDto): Observable<any> {
    return this.httpClient.put<any>(`${this.jugadoresURL}/pases/editar/${id}`, editarPaseDto );
  }
}
