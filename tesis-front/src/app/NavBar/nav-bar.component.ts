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
  isAdmin = false;
  isUser = true;
  isEncargadoJugadores = false;
  isEncargadoSanciones = false;
  isEncargadoTorneos = false;
  
  constructor(private tokenService : TokenService, private router: Router, private usuarioService : UsuarioService) {}

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserNamme();
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoJugadores = this.tokenService.isEncargadoJugadores();
    this.isEncargadoTorneos = this.tokenService.isEncargadoTorneos();
    this.isEncargadoSanciones = this.tokenService.isEncargadoSanciones();

  }

  logOut(): void {
    this.tokenService.logOut();
    Swal.fire({
      icon: 'success',
      title: 'Cerraste sesion correctamente!'
    })
  }

}
