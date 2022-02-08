import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EmailValuesDto } from 'src/app/core/Dtos/usuarios/email-values-dto';
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
  items : MenuItem[] = [];

  constructor(private router : Router, private recuperarPasswordService : RecuperarPasswordService) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  
  cargarItems(): void {
    this.items = [
      {label:'Usuarios'},
      {label:'Enviar email', disabled:true}
    ]
  }

  enviarEmail(form: NgForm): void {
    this.alertaEnviandoemail();
    const emailValuesDto = new EmailValuesDto(this.mailTo, this.userName, this.token);
    console.log(emailValuesDto);
    
    this.recuperarPasswordService.enviarEmailPassword(emailValuesDto).subscribe(
      data =>{
        this.msj = data.mensaje;
        //Swal.close();
        Swal.fire(this.msj, 'El mismo contiene un enlace para restablecer tu contraseña', 'success');
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
