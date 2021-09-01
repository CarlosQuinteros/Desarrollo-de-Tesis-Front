import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//constantes almacendas en el navegador
// Apareceran en session storage
const TOKEN_KEY = 'AuthToken';
/* corrigiendo problemas de vulnerabilidad, cualquiera podia entrar al session storage y cambiar el rol y acceder*/
/*const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
*/


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  constructor(private router : Router, private httpClient : HttpClient) { }

  public setToken(token: string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public isTokenExpired():boolean {
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const expiracion = values.exp;
    let fechaActual = new Date().getTime() / 1000;
    if(expiracion < fechaActual){
      return true
    }
    return false;
  }

  public isLogged():boolean{
    if(this.getToken()){
      return true
    }
    return false;
  }

  public getUserNamme():string | null {
    if(!this.isLogged()){
      return null;
    }
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const userName = values.sub;
    
    return userName;
  }

  public getAuthorities():string[]{
    if(!this.isLogged()){
      return [];
    }
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    return roles;

  }

  public isAdmin(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const roles = this.getAuthorities();
    
    if(!roles.includes('ROLE_ADMIN')){
      return false;
    }
    return true;
  }

  public isEncargadoJugadores(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const roles = this.getAuthorities();
    
    if(!roles.includes('ROLE_ENCARGADO_DE_JUGADORES')){
      return false;
    }
    return true;
  }

  public isEncargadoTorneos(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const roles = this.getAuthorities();
    
    if(!roles.includes('ROLE_ENCARGADO_DE_TORNEOS')){
      return false;
    }
    return true;
  }

  public isEncargadoSanciones(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const roles = this.getAuthorities();
    
    if(!roles.includes('ROLE_ENCARGADO_DE_SANCIONES')){
      return false;
    }
    return true;
  }

  public isUser(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const roles = this.getAuthorities();
    
    if(!roles.includes('ROLE_USER')){
      return false;
    }
    return true
  }

  public logOut(): void{
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
