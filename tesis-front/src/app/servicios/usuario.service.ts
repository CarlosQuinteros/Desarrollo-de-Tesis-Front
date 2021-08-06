import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambiarPassword } from '../Dtos/cambiar-password';
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

    public UsuarioPorId(id:number):Observable<Usuario> {
      return this.httpClient.get<Usuario>(`${this.usuariosURL}/detalle/${id}`);
    }

    public UsuarioPorNombreUsuario(nombreUsuario: string):Observable<Usuario>{
      return this.httpClient.get<Usuario>(`${this.usuariosURL}/detalle/nombreUsuario/${nombreUsuario}`);
    }

    public cambiarPassword(id:number,cambiarPassword: CambiarPassword):Observable<any>{
      return this.httpClient.put<any>(`${this.usuariosURL}/cambiarContrasenia/${id}`, cambiarPassword );
    }
}
