import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailValuesDto } from '../Dtos/usuarios/email-values-dto';
import { RecuperarPasswordDto } from '../Dtos/usuarios/recuperar-password-dto';
import { Usuario } from '../modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class RecuperarPasswordService {

  constructor(private httpClient: HttpClient) { }

  recuperarPasswordURL: string ='http://localhost:8080/email-password';

  public existeTokenPassword (tokenPassword: string): Observable<boolean> {
      return this.httpClient.get<any>(`${this.recuperarPasswordURL}/existe-token/${tokenPassword}`);
  }

  public enviarEmailPassword(emailValueDto  : EmailValuesDto):Observable<any> {
      return this.httpClient.post<any>(`${this.recuperarPasswordURL}/enviar-email`, emailValueDto);
  }

  public recuperarPassword(recuperarPasswordDto : RecuperarPasswordDto): Observable<any>{
    return this.httpClient.post<any>(`${this.recuperarPasswordURL}/recuperar-password`, recuperarPasswordDto);
  }

  
  public usuarioPorTokenPassword(tokenPassword: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.recuperarPasswordURL}/usuarioPorTokenPassword/${tokenPassword}`);
  }
}
