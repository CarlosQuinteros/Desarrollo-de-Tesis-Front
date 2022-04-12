import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambioDeClubDto } from 'src/app/core/Dtos/jugadores/cambio-de-club-dto';
import { Pase } from 'src/app/core/modelo/pase';

@Injectable({
  providedIn: 'root'
})
export default class PasesService {

  pasesJug = environment.pasesJugadoresURL;

  constructor(private httpClient : HttpClient) { }

  public cantidadPases():Observable<number>{
    return this.httpClient.get<number>(`${this.pasesJug}/cantidad`);
  }

  public listaPases():Observable<Pase[]>{
    return this.httpClient.get<Pase[]>(`${this.pasesJug}/listado`);
  }

  public prueba(cambioDeClubDto : CambioDeClubDto):Observable<any>{
    return this.httpClient.post<any>(`${this.pasesJug}/prueba`, cambioDeClubDto);
  }

  public detallePase(id : number):Observable<Pase>{
    return this.httpClient.get<Pase>(`${this.pasesJug}/detalle/${id}`);
  }
}
