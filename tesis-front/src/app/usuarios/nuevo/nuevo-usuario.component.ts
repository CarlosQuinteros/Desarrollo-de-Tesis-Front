import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/Dtos/nuevo-usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  emailUsuario: string = '';
  userNameUsuario: string = '';
  passwordUsuario: string = '';
  nuevoUsuario: NuevoUsuario | any;
  msj: string = '';
  roles = [
    {
      name: 'Admin',
      active: false,
      description: 'El administrador tiene acceso a todos los permisos.',
    },
    {
      name: 'Encargado de torneos',
      active: false,
      description:
        'Tiene permitido crear, modificar y dar de alta torneos y partidos.',
    },
    {
      name: 'Encargado de jugadores',
      active: false,
      description:
        'Tiene permitido crear, modificar y dar de baja jugadores, clubes y transferencias.',
    },
    {
      name: 'Encargado de sanciones',
      active: false,
      description: 'Tiene permitido crear, modificar y dar de baja sanciones.',
    },
    {
      name: 'User',
      active: true,
      description: 'Rol por defecto. Tiene permitido consultar jugadores y partidos.'
    }
  ];


  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  guardarUsuario(form: NgForm): void {
    let rolesUsuarios = this.construirRoles();
    this.nuevoUsuario = new NuevoUsuario(
      this.nombreUsuario,
      this.apellidoUsuario,
      this.emailUsuario,
      this.userNameUsuario,
      this.passwordUsuario,
      rolesUsuarios
    );
    Swal.fire({
      title: '¿Crear usuario nuevo?',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.solicitarCreacionUsuario(form);
      }
    });
  }

  solicitarCreacionUsuario(form: NgForm): void {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: '',
        });
        form.resetForm();
        this.resetRoles();
      },
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el usuario',
          text: this.msj,
        });        
      }
    );
  }

  construirRoles(): string[] {
    let result = this.roles
                    .filter((role) => role.active === true)
                    .map((role) => role.name);
    /* console.log(result); */
    
    return result;
  }

  resetRoles(): void {
    this.roles
      .filter((role) => role.name != 'User')
      .forEach((role) => role.active = false);
    
    /* console.log(this.roles); */
    
  }
}
