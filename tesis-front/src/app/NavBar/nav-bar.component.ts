import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../modelo/usuario';
import { TokenService } from '../servicios/token.service';
import { UsuarioService } from '../servicios/usuario.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  nombreUsuario: any;
  usuario : Usuario | any;
  cant : number = 0
  constructor(private tokenService : TokenService, private router: Router, private usuarioService : UsuarioService) {}

  ngOnInit(): void {
    if(this.tokenService.getToken()!== null && this.cant==0) {
      this.nombreUsuario = this.tokenService.getUserNamme();
      this.usuarioService.UsuarioPorNombreUsuario(this.nombreUsuario).subscribe(
        data => {
          this.usuario = data;
        }
        
      )
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Cerraste Sesion correctamente!'
    })

  }

}
