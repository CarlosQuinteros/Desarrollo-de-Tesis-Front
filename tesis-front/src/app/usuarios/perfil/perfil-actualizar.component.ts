import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PerfilUsuarioDto } from 'src/app/Dtos/usuarios/perfil-usuario-dto';
import { Usuario } from 'src/app/modelo/usuario';
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

  usuario : Usuario = new Usuario('','','','',''); //sera undefined hasta que se obtenga en la suscripción
  msj : string = '';
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(private tokenService : TokenService, private router : Router, private location : Location,private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.cargarItems();
    this.obtenerUsuario();
  }

  cargarItems(): void {
    this.items = [
      {label:'Perfil'},
      {label:'Editar Datos', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
  }

  goBack(): void {
    this.location.back();
  }

   obtenerUsuario():void{
    let username : any = this.tokenService.getUserNamme();
    /*this.usuarioService.UsuarioPorNombreUsuario(username).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        this.msj = err.error.mensaje;
      }
    )*/
    this.usuarioService.UsuarioPorNombreUsuario(username).toPromise().then(
      data => {
        this.usuario = data;
        
    }, err => {
      this.msj = err.error.mensaje;
    })
  }

  actualizarDatos():void{
    const usuarioActualizar = new PerfilUsuarioDto(this.usuario.nombre, this.usuario.apellido, this.usuario.email, this.usuario.nombreUsuario);
    //console.log(usuarioActualizar);
    Swal.fire({
      title: '¿Realmente deseas actualizar tus datos?',
      text:' Deberás iniciar sesión nuevamente luego de actualizar tu información',
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
