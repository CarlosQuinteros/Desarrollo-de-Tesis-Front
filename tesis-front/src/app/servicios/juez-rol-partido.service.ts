import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JuezRolDto } from '../core/Dtos/participaciones-jueces/juez-rol-dto';
import { JuezRol } from '../core/modelo/juez-rol';

@Injectable({
  providedIn: 'root'
})
export class JuezRolPartidoService {

  participacionJuecesURL : string = environment.juezRolURL;

  constructor(
    private httpClient: HttpClient
  ) { }

  public crearParticipacionJuez(nuevoJuezEnPartido : JuezRolDto):Observable<any>{
    return this.httpClient.post<any>(`${this.participacionJuecesURL}/crear`, nuevoJuezEnPartido);
  }

  public editarParticipacionJuez(editarJuezEnPartido : JuezRolDto, id : number):Observable<any>{
    return this.httpClient.put<JuezRol>(`${this.participacionJuecesURL}/editar/${id}`, editarJuezEnPartido);
  }

  public eliminarParticipacionJuez(id : number):Observable<any>{
    return this.httpClient.delete<any>(`${this.participacionJuecesURL}/eliminar/${id}`);
  }
}
