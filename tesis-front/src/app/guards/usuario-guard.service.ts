import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/token.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuardService implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {

    const rolesEsperados = route.data.rolesEsperados;
    const rolesDelUsuario = this.tokenService.getAuthorities();
    let permitido = false;

    /** comprobamos si esta logueado o no, para dirigir al login */
    if (!this.tokenService.isLogged()) {
      this.router.navigate(['/login']);
      Swal.fire('Acceso denegado', 'Debes iniciar sesion', 'error');
      
      return false;
    }

    /** comprobamos si no expirto el token para cargar el componente */    
    if(this.tokenService.isTokenExpired()){
      this.router.navigate(['/login']);
      Swal.fire('Token Expirado', 'Debes iniciar sesion nuevamente', 'info');
      this.tokenService.logOut();
      return false;
    }
    
    /** Comprobamos con un acumulador booleano, si el usuario tiene alguno de los roles esperados para acceder */
    rolesEsperados.forEach((rol: string) => {
      permitido = permitido || rolesDelUsuario.includes(rol);
    });

    if (!permitido) {
      this.router.navigate(['/inicio']);
      Swal.fire('Acceso denegado','No tienes los permisos necesarios para acceder','error');
      return false;
    }

    /** si paso todas las comprobaciones, permtimos el acceso */
    return true;
  }

}
