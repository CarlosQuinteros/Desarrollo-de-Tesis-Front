import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios : Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    
    if(this.tokenService.getToken()){
      this.cargarListado();
    }
    else{
      this.router.navigate(['/login']);
    }

  }

  cargarListado():void {
    this.usuarioService.listaUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
        
      }
    )
  }

}
