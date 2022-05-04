import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NuevoJuezDto } from '../core/Dtos/jueces/nuevo-juez-dto';
import { Juez } from '../core/modelo/juez';

@Injectable({
  providedIn: 'root'
})
export class JuezService {
  juecesURL : string = environment.juecesURL;

  constructor(private httpClient : HttpClient) { }

  public crearJuez(nuevoJuez : NuevoJuezDto) : Observable<any>{
    return this.httpClient.post<any>(`${this.juecesURL}/crear`, nuevoJuez);
  }

  public detalleJuezPorId(id : number): Observable<Juez>{
    return this.httpClient.get<Juez>(`${this.juecesURL}/detalle/${id}`);
  }
  
  public detalleJuezPorDniOLegajo(dniOLegajo : number): Observable<Juez>{
    return this.httpClient.get<Juez>(`${this.juecesURL}/detalle/${dniOLegajo}`);
  }

  public editarJuez(id:number, juezEditado : NuevoJuezDto): Observable<any>{
    return this.httpClient.put<any>(`${this.juecesURL}/editar/${id}`, juezEditado);
  }

  public listadoJueces(): Observable<Juez[]>{
    return this.httpClient.get<Juez[]>(`${this.juecesURL}/listado`);
  }

  public eliminarJuez(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.juecesURL}/eliminar/${id}`);
  }

  public cantidadTotalJueces(): Observable<number>{
    return this.httpClient.get<number>(`${this.juecesURL}/cantidad`);
  }

  
}
