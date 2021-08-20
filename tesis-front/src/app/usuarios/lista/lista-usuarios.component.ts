import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios : Usuario[] = [];
  msj : string = '';

  constructor(private usuarioService: UsuarioService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    
    if(this.tokenService.getToken()){
      this.cargarListado();
    }
    else{
      this.router.navigate(['/login']);
    }

  }

  cargarListado():void {
    this.usuarioService.listaUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
        
      }
    )
  }

  darDeAltaUsuario(id: number):void {
    /* alerta de confirmacion */
    Swal.fire({
      title: '¿Realmente quieres dar de alta este usuario?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: `Dar alta`,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarAltaUsuario(id);     
      }
      
    })
  }

  solicitarAltaUsuario(id: number):void {
    /*solicito el alta al backend */
    this.usuarioService.darDeAltaUsuario(id).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire('Usuario Activo', this.msj, 'success');
        this.cargarListado();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de alta', this.msj, 'error')

      })
  }

  darDeBajaUsuario(id: number): void {
    /* alerta de confirmacion */
    Swal.fire({
      title: '¿Realmente quieres dar de baja este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Dar baja`,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarBajaUsuario(id);
      }
      
    })
  }

  solicitarBajaUsuario(id: number): void {

    /*solicito baja al backend */
    this.usuarioService.darDeBajaUsuario(id).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire('Usuario Inactivo', this.msj, 'success');
        this.cargarListado();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de baja', this.msj, 'error')

      })

  }

}
