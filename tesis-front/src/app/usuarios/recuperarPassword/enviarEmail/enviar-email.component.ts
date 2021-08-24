import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValuesDto } from 'src/app/Dtos/usuarios/email-values-dto';
import { RecuperarPasswordService } from 'src/app/servicios/recuperar-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.css']
})
export class EnviarEmailComponent implements OnInit {

  mailTo: string = '';
  userName: string = '';
  token: string = '';
  msj : string = '';

  constructor(private router : Router, private recuperarPasswordService : RecuperarPasswordService) { }

  ngOnInit(): void {

  }

  enviarEmail(form: NgForm): void {
    this.alertaEnviandoemail();
    const emailValuesDto = new EmailValuesDto(this.mailTo, this.userName, this.token);
    this.recuperarPasswordService.enviarEmailPassword(emailValuesDto).subscribe(
      data =>{
        this.msj = data.mensaje;
        //Swal.close();
        Swal.fire(this.msj, 'Con un enlace para restablecer tu contraseña', 'success');
        form.resetForm();
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire('Error al enviar el correo', this.msj, 'error');
      }
    )
  }

  alertaEnviandoemail(): void {
    Swal.fire('Verificando datos', 'Por favor espere', 'info');
  }

}
