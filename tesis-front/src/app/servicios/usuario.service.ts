import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambiarPassword } from 'src/app/core/Dtos/usuarios/cambiar-password';
import { EditarUsuarioDto } from 'src/app/core/Dtos/usuarios/editar-usuario-dto';
import { NuevoUsuario } from 'src/app/core/Dtos/usuarios/nuevo-usuario';
import { PerfilUsuarioDto } from 'src/app/core/Dtos/usuarios/perfil-usuario-dto';
import { Usuario } from 'src/app/core/modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient : HttpClient) { }

    usuariosURL: string = environment.usuariosURL;

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

    public actualizarPerfilDatos(id:number, perfilUsuarioDto : PerfilUsuarioDto):Observable<any>{
      return this.httpClient.put<any>(`${this.usuariosURL}/perfil/actualizarDatos/${id}`, perfilUsuarioDto);
    }

    public actualizarUsuario(id: number, editarUsuarioDto : EditarUsuarioDto):Observable<any>{
      return this.httpClient.put<any>(`${this.usuariosURL}/editar/${id}`, editarUsuarioDto);
    }

    public enviarEmailUsuarioNuevo(nuevoUsuario : NuevoUsuario):Observable<any>{
      return this.httpClient.post<any>(`${this.usuariosURL}/envio-email/usuario-nuevo`, nuevoUsuario);
    }
}
