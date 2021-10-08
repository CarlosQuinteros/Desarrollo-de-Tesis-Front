import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../servicios/token.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      if (this.tokenService.isLogged()){
        this.router.navigate(["/inicio"]);
        Swal.fire('Ya iniciaste sesion!', 'Te redireccionamos a la pantalla de inicio', 'info');
        return false;
      }
    return true;
  }
  
}
