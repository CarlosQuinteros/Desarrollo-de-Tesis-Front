import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CambiarPassword } from 'src/app/Dtos/cambiar-password';
import { Usuario } from 'src/app/modelo/usuario';
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
  

  constructor(private tokenService : TokenService, private router: Router, private usuarioService : UsuarioService) {
  
   }

  ngOnInit(): void {
    this.existeToken();
    this.obtenerUsuario();
  }

  existeToken():void{
    if(!this.tokenService.getToken()){
      this.router.navigate(['/login']);
    }    

  }

  cambiarPassword():void{
    /*al hacer click en cambiar Contraseña */
    console.log(this.passwordActual, this.passwordNuevo, this.repetirPassword);
    this.cambiarPasswordDto = new CambiarPassword(this.passwordActual, this.passwordNuevo, this.repetirPassword);
    Swal.fire({
      title: '¿Realmente deseas cambiar la contraseña?',
      showCancelButton: true,
      confirmButtonText: `Cambiar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.showLoading();
        this.solicitarCambioPassword();
      } 
    })
      
  }

  solicitarCambioPassword():void{
    /*Solicitar cambio de contraseña al backend*/
    this.usuarioService.cambiarPassword(this.usuario.id, this.cambiarPasswordDto).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:''
        })
        
        this.restablecerFormulario();
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
