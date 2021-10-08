import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilUsuarioDto } from 'src/app/Dtos/usuarios/perfil-usuario-dto';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-actualizar',
  templateUrl: './perfil-actualizar.component.html',
  styleUrls: ['./perfil-actualizar.component.css']
})
export class PerfilActualizarComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  usuario: any; //sera undefined hasta que se obtenga en la suscripción
  msj : string = '';

  constructor(private tokenService : TokenService, private router : Router, private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario():void{
    let username : any = this.tokenService.getUserNamme();
    this.usuarioService.UsuarioPorNombreUsuario(username).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        this.msj = err.error.mensaje;
      }
    )
  }

  actualizarDatos():void{
    const usuarioActualizar = new PerfilUsuarioDto(this.usuario.nombre, this.usuario.apellido, this.usuario.email, this.usuario.nombreUsuario);
    //console.log(usuarioActualizar);
    Swal.fire({
      title: '¿Realmente deseas actualizar tus datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Cambiar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.solicitarActualizacionDatos(this.usuario.id, usuarioActualizar);
      } 
    })
    
  }

  solicitarActualizacionDatos(id: number, usuarioActualizar : PerfilUsuarioDto):void {
    this.usuarioService.actualizarPerfilDatos(id, usuarioActualizar).subscribe(
      data => {
        this.usuario = data;
        Swal.fire('Datos actualizados correctamente', 'Debes inicar sesion nuevamente', 'success').then((result) => {
          if(result.isConfirmed || result.dismiss === Swal.DismissReason.esc){
            this.tokenService.logOut();
          }
        });

      }, err => {
        this.msj = err.error.mensaje;
        Swal.fire('Datos no actualizados correctamente', this.msj, 'error');
    })
  }

}
