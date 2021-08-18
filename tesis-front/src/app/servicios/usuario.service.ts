import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambiarPassword } from '../Dtos/cambiar-password';
import { NuevoUsuario } from '../Dtos/nuevo-usuario';
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

    public crearUsuario(nuevoUsuario : NuevoUsuario):Observable<any> {
      return this.httpClient.post<any>(`${this.usuariosURL}/nuevo`, nuevoUsuario);
    }

    public getCantidadUsuarios():Observable<number> {
      return this.httpClient.get<any>(`${this.usuariosURL}/total`);
    }

    public getCantidadUsuariosActivos():Observable<number> {
      return this.httpClient.get<any>(`${this.usuariosURL}/total-activos`);

    }

    public getCantidadUsuariosInactivos():Observable<number> {
      return this.httpClient.get<any>(`${this.usuariosURL}/total-inactivos`);
    }

    public darDeAltaUsuario(id:number):Observable<any>{
      return this.httpClient.put<any>(`${this.usuariosURL}/alta/${id}`,id);
    }

    public darDeBajaUsuario(id:number):Observable<any>{
      return this.httpClient.put<any>(`${this.usuariosURL}/baja/${id}`,id);
    }
}
