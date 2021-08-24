import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuarioDto } from 'src/app/Dtos/usuarios/editar-usuario-dto';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  constructor(private ruteActiva : ActivatedRoute, private router : Router, private usuarioService : UsuarioService, private tokenService : TokenService) { }

  msj : string = '';
  usuario : any // sera undefined hasta obtener el usuario desde la suscripción
  rolesDelUsuario: string[] = [];
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

  ngOnInit(): void {
    const id = this.ruteActiva.snapshot.params.id;
    this.obtenerUsuario(id);
  }

  obtenerUsuario(id: number):void{
    this.usuarioService.UsuarioPorId(id).subscribe(
      data => {
        this.usuario = data;
        //console.log(this.usuario);
        this.formatearRolesUsuario();
        
    },
    err => {
      this.msj = err.error.mensaje;
      this.router.navigate(['/usuarios/lista']);
      Swal.fire(this.msj, 'Regresando al listado', 'error');

    })
  }

  /* obtenego los roles (solo nombres) que tiene el usuario y luego al 
      array de roles[nombre, activo y descripcion]
     que muestro en la vista agrego true o false en activo 
     filtrando en los roles que tiene el usuario*/
  formatearRolesUsuario(){
    this.rolesDelUsuario = this.usuario.roles.map((rol: { rolNombre: string; }) => rol.rolNombre);
    //console.log(this.rolesDelUsuario);
    this.roles.forEach(rol =>{
      //rol.active = this.rolesDelUsuario.filter(role => role.includes(rol.name.toUpperCase().split(' ')[rol.name.split(' ').length - 1])).length > 0 ? true : false;
      rol.active = this.rolesDelUsuario.filter(
        role => {
          let nombre = rol.name.toUpperCase().split(' ')
          return role.includes(nombre[nombre.length -1])
        }).length > 0 ? true : false;
    })
  }
/* contruyo los roles que se enviaran al backen para actualizar el usuario, dependiendo
    si active del checkbox tipo switch es true, obtengo solos los nombres de los roles, es decir un array de string[]
*/
  construirRoles(): string[] {
    let result = this.roles.filter((role) => role.active === true).map((role) => role.name);
    //console.log(result);
    return result;
  }

  actualizarUsuario(id: number):void {
    let rolesActualizar = this.construirRoles();
    const editarUsuarioDto = new EditarUsuarioDto(this.usuario.nombre, this.usuario.apellido, this.usuario.email, this.usuario.nombreUsuario, rolesActualizar );
    //console.log(editarUsuarioDto);
    /* alerta de confirmacion */
    Swal.fire({
      title: '¿Realmente quieres actualizar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Actualizar`,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarActualizacionUsuario(id, editarUsuarioDto);
      }
      
    })
  }

  solicitarActualizacionUsuario(id: number, usuarioActualizar : EditarUsuarioDto){
    this.usuarioService.actualizarUsuario(id, usuarioActualizar).subscribe(
      data => {
        this.usuario = data;
        Swal.fire('Usuario actualizado correctamente', '', 'success');
      },
      err => {
        this.msj = err.error.mensaje;
        Swal.fire('Usuario no actualizado', this.msj, 'error');
      }
    )
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
        this.ngOnInit();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de alta', this.msj, 'error')

      })
  }

  solicitarBajaUsuario(id: number): void {

    /*solicito baja al backend */
    this.usuarioService.darDeBajaUsuario(id).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire('Usuario Inactivo', this.msj, 'success');
        this.ngOnInit();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de baja', this.msj, 'error')

      })

  }



}
