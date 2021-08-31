import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../servicios/token.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  roles : string[] = [];
  isAdmin = false;

  cantidadUsuarios : number = 0;
  cantidadActivos : number = 0;
  cantidadInactivos : number = 0;

  constructor(private tokenService: TokenService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    /*if(!this.tokenService.getToken()){
      this.router.navigate(['/login']);
    } */
    this.roles = this.tokenService.getAuthorities();
    this.isAdmin = this.tokenService.isAdmin();

    this.obtenerCantidadUsuarios();
    this.obtenerCantidadUsuariosActivos();
    this.obtenerCantidadUsuariosInactivos();
  }

  public obtenerCantidadUsuarios():void{
    this.usuarioService.getCantidadUsuarios().subscribe(data =>{
        this.cantidadUsuarios = data;
    })
  }

  public obtenerCantidadUsuariosActivos():void{
    this.usuarioService.getCantidadUsuariosActivos().subscribe(data =>{
      this.cantidadActivos = data;
    })
  }

  public obtenerCantidadUsuariosInactivos():void{
    this.usuarioService.getCantidadUsuariosInactivos().subscribe(data =>{
      this.cantidadInactivos = data;
    })
  }

  public esAdmin(): void{
    this.isAdmin  = this.roles.includes('ROLE_ADMIN');
    
  }



}
