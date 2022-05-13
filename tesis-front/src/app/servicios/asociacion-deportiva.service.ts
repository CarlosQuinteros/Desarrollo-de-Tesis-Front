import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsociacionDeportivaDto } from '../core/Dtos/asociaciones-deportivas/asociacion-deportiva-dto';
import { AsociacionDeportiva } from '../core/modelo/asociacion-deportiva';

@Injectable({
  providedIn: 'root'
})
export class AsociacionDeportivaService {

  asociacionesURL : string = environment.asociacionesURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public crearAsociacion(nuevaAsociacionDeportiva : AsociacionDeportivaDto) : Observable<any>{
    return this.httpClient.post<any>(`${this.asociacionesURL}/crear`, nuevaAsociacionDeportiva);
  }

  public listadoAsociaciones(): Observable<AsociacionDeportiva[]>{
    return this.httpClient.get<AsociacionDeportiva[]>(`${this.asociacionesURL}/listado`);
  }

  public detalleAsociacion(id: number):Observable<AsociacionDeportiva>{
    return this.httpClient.get<AsociacionDeportiva>(`${this.asociacionesURL}/detalle/${id}`);
  }

  public editarAsociacion(editarAsociacion : AsociacionDeportivaDto, id : number): Observable<any>{
    return this.httpClient.put<any>(`${this.asociacionesURL}/editar/${id}`, editarAsociacion);
  }

  public eliminarAsociacion(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.asociacionesURL}/eliminar/${id}`);
  }


}
