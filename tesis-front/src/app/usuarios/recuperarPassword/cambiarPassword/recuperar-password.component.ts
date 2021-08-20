import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecuperarPasswordDto } from 'src/app/Dtos/recuperar-password-dto';
import { Usuario } from 'src/app/modelo/usuario';
import { RecuperarPasswordService } from 'src/app/servicios/recuperar-password.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  nombreUsuario: string = '';
  email: string = '';
  msj : string = '';
  password : string = '';
  confirmarPassword : string = '';
  tokenPassword : string = '';

  constructor(
    private router: Router, 
    private recuperarPasswordService : RecuperarPasswordService,
    private rutaActiva : ActivatedRoute) { }

  ngOnInit(): void {
    this.tokenPassword = this.rutaActiva.snapshot.params.tokenPassword;
    this.verificarTokenExiste(this.tokenPassword);
    setTimeout(function(){
      console.log("Luego de 5 segundos cargo");
    },5000);

  }

  /*verifico si existe un usuario con ese token, lo obtengo. De lo contrario lo mando alerta y redirecciono*/
  verificarTokenExiste(token: string):void{
    this.recuperarPasswordService.usuarioPorTokenPassword(token).subscribe(
      data =>{
        this.nombreUsuario = data.nombreUsuario;
        this.email = data.email;
        
        Swal.fire('Token de recuperación válido', `Usuario: ${this.nombreUsuario}<br/>Correo: ${this.email}`, 'success');
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire(this.msj, 'Debe generar nuevamente el token', 'error');        
        this.router.navigate(['/recuperarContraseña/enviarEmail']);
      }
      )
  }

  /*ngSubmit cambiarPassword() */
  cambiarPassword(form : NgForm): void {
    Swal.fire({
      title: '¿Realmente deseas cambiar la contraseña?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Cambiar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.solicitarCambiarPassword(form);
      } 
    })
  }

  /*solicito cambio de contraseña al backend*/
  solicitarCambiarPassword(form: NgForm):void{
    const recuperarPasswordDto = new RecuperarPasswordDto(this.password, this.confirmarPassword, this.tokenPassword);
    this.recuperarPasswordService.recuperarPassword(recuperarPasswordDto).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire(this.msj, '', 'success');
        form.resetForm();
      },
      err => {
        this.msj = err.error.mensaje;
        Swal.fire(this.msj, '', 'error');
      }
    )
  }

}
