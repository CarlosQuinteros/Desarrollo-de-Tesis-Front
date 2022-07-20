import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AnotacionDto } from '../core/Dtos/anotaciones/anotacion-dto';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  anotacionesURL : string = environment.anotacionesURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public crearAnotacion(nuevaAnotacion : AnotacionDto):Observable<any>{
    return this.httpClient.post<any>(`${this.anotacionesURL}/crear`, nuevaAnotacion);
  }

  public editarAnotacion(editarAnotacion : AnotacionDto, id : number):Observable<any>{
    return this.httpClient.put<any>(`${this.anotacionesURL}/editar/${id}`, editarAnotacion);
  }

  public tiposDeGol():Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.anotacionesURL}/tipo-goles`);
  }


}
