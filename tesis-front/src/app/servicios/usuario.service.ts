import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient : HttpClient) { }

    usuariosURL: string = 'http://localhost:8080/usuarios';

    public listaUsuarios():Observable<Usuario[]> {
      return this.httpClient.get<Usuario[]>(`${this.usuariosURL}/listado`);
    }
}
