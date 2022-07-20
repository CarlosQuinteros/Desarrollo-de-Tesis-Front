import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SustitucionDto } from '../core/Dtos/sustituciones/sustitucion-dto';

@Injectable({
  providedIn: 'root'
})
export class SustitucionService {

  sustitucionesURL: string = environment.sustitucionesURL;

  constructor(
    private httpClient : HttpClient
  ) { }

  public crearSustitucion(nuevaSustitucion : SustitucionDto):Observable<any> {
    return this.httpClient.post<any>(`${this.sustitucionesURL}/crear`, nuevaSustitucion);
  }

  public eliminarSustitucion(idSustitucion : number):Observable<any> {
    return this.httpClient.delete<any>(`${this.sustitucionesURL}/eliminar/${idSustitucion}`);
  }
}
