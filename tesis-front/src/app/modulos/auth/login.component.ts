import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/core/Dtos/usuarios/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario : LoginUsuario | any;
  nombreUsuario : string ='';
  password : string ='';
  roles: string[]=[];
  errMsj : string = '';
  hide:boolean = true;

  constructor(
    private authService:AuthService,
    private tokenService : TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['/inicio']);
    }
  }

  onLogin():void {
      this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
      this.authService.login(this.loginUsuario).subscribe(
        data => {

          //almacenamos en LocalStorage
          this.tokenService.setToken(data.token);

          this.isLogged = true;
          this.isLoginFail = false;

          //sweetalert2 ok
          Swal.fire({
            icon : 'success',
            title : 'Bienvenido',
            text : 'Iniciaste sesion correctamente'
          })
          this.roles = this.tokenService.getAuthorities();
          this.router.navigate(['/inicio']);
        },
        err =>{
          this.isLogged = false;
          this.isLoginFail = true;
          this.errMsj = err.error.mensaje;
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesion',
            text: err.error.message
          })
        }
      )
  
  }

  hidepassword():void {
    this.hide=!this.hide;
  }

}
