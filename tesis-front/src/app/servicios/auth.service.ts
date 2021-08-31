import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../Dtos/usuarios/login-usuario';
import { JwtDTO } from '../Dtos/usuarios/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: Usuario): Observable<any>{
    return this.httpClient.post<any>(`${this.authURL}/nuevo`, nuevoUsuario)
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(`${this.authURL}/login`, loginUsuario);
  }
}
