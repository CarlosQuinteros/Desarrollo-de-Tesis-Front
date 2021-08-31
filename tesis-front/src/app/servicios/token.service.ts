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
  constructor(private router : Router) { }

  public setToken(token: string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  /*
  public setUserNamme(userNamme:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userNamme);
  } */

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

  /*
  public setAuthorities(authorities: string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  } 
  */

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
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    if(!roles.includes('ROLE_ADMIN')){
      return false;
    }
    return true;
  }

  public isEncargadoJugadores(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    if(!roles.includes('ROLE_ENCARGADO_DE_JUGADORES')){
      return false;
    }
    return true;
  }

  public isEncargadoTorneos(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    if(!roles.includes('ROLE_ENCARGADO_DE_TORNEOS')){
      return false;
    }
    return true;
  }

  public isEncargadoSanciones(): boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload: any = token?.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    
    if(!roles.includes('ROLE_ENCARGADO_DE_SANCIONES')){
      return false;
    }
    return true;
  }

  public logOut(): void{
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
