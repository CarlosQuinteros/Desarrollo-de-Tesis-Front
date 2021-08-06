import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../Dtos/login-usuario';
import { AuthService } from '../servicios/auth.service';
import { TokenService } from '../servicios/token.service';

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

          //almacenamos en sessionStorage
          this.tokenService.setToken(data.token);
          this.tokenService.setUserNamme(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
    
          this.roles = data.authorities;

          this.isLogged = true;
          this.isLoginFail = false;

          //sweetalert2 ok
          Swal.fire({
            icon : 'success',
            title : 'Bienvenido',
            text : 'Iniciaste session correctamente'
          })
          this.roles = this.tokenService.getAuthorities();
          this.router.navigate(['/inicio']);
        },
        err =>{
          this.isLogged = false;
          this.isLoginFail = true;
          this.errMsj = err.error.mensaje;
          if(!this.errMsj){
            this.errMsj = "Si el problema persiste, consulte con el administrador.";
           } 

          console.log(this.errMsj);

          //sweetalert2 con error
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar session',
            text: `${this.errMsj}`
          })
        }
      )
  
  }

  hidepassword():void {
    this.hide=!this.hide;
  }

}
