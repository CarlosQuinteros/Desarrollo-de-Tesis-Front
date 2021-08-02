import { Injectable } from '@angular/core';

//constantes almacendas en el navegador
// Apareceran en session storage
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  constructor() { }

  public setToken(token: string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string|null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserNamme(userNamme:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,userNamme);
  }

  public getUserNamme():string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }

  public getAuthorities():string[]{
    this.roles =[];
    let getItemAuthorities = sessionStorage.getItem(AUTHORITIES_KEY);
    if(getItemAuthorities != null){
      JSON.parse(getItemAuthorities).forEach((authority: { authority: string; }) =>{
        this.roles.push(authority.authority);
      });
    }
    return this.roles;

  }

  public logOut(): void{
    window.sessionStorage.clear();
  }
}
