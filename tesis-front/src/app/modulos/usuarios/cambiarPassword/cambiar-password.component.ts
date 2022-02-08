import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CambiarPassword } from 'src/app/core/Dtos/usuarios/cambiar-password';
import { Usuario } from 'src/app/core/modelo/usuario';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  passwordActual : string ='';
  passwordNuevo : string ='';
  repetirPassword: string = '';
  msj: string ='';
  usuario : Usuario | any;
  cambiarPasswordDto : CambiarPassword | any;
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(private tokenService : TokenService, private router: Router,private location: Location, private usuarioService : UsuarioService) {
  
   }

  ngOnInit(): void {
    if(!this.tokenService.isLogged()){
      this.router.navigate(['/login']);
    }
    this.cargarItems();
    this.obtenerUsuario();
  }

  cargarItems(): void {
    this.items = [
      {label:'Perfil'},
      {label:'Cambiar contraseña',disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

  goBack(){
    this.location.back();
  }

  existeToken():void{
    if(!this.tokenService.getToken()){
      this.router.navigate(['/login']);
    }    

  }

  cambiarPassword(form: NgForm):void{
    /*al hacer click en el boton cambiar Contraseña */
    console.log(this.passwordActual, this.passwordNuevo, this.repetirPassword);
    this.cambiarPasswordDto = new CambiarPassword(this.passwordActual, this.passwordNuevo, this.repetirPassword);
    Swal.fire({
      title: '¿Realmente deseas cambiar la contraseña?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.showLoading();
        this.solicitarCambioPassword(form);
      } 
    })
      
  }

  solicitarCambioPassword(form : NgForm):void{
    /*Solicitar cambio de contraseña al backend*/
    this.usuarioService.cambiarPassword(this.usuario.id, this.cambiarPasswordDto).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Recuerdala para tu próximo inicio de sesion'
        })
        form.resetForm();
      }, 
      err => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la contraseña',
          text: this.msj
          
        })
      }
    )
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

  restablecerFormulario():void{
    this.passwordActual = '';
    this.passwordNuevo = '';
    this.repetirPassword = '';
  }


}
