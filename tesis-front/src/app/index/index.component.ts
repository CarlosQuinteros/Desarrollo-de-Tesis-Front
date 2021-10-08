import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from '../servicios/club.service';
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
  isUser = true;
  isEncargadoTorneos = false;
  isEncargadoJugadores = false;
  isEncargadoSanciones = false;

  nombreUsuario: any = '';

  cantidadUsuarios : number = 0;
  cantidadActivos : number = 0;
  cantidadInactivos : number = 0;
  cantidadTotalClubes : number = 0;

  constructor(private tokenService: TokenService, 
    private router: Router, 
    private usuarioService: UsuarioService, 
    private clubService: ClubService) { }

  ngOnInit(): void {

    this.nombreUsuario = this.tokenService.getUserNamme();
    this.obtenerRolesDelUsuario();
    this.cargarInicio();
    
  }

  public obtenerRolesDelUsuario():void{
    this.roles = this.tokenService.getAuthorities();
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoJugadores = this.tokenService.isEncargadoJugadores();
    this.isEncargadoTorneos = this.tokenService.isEncargadoTorneos();
    this.isEncargadoSanciones = this.tokenService.isEncargadoSanciones();
  }

  public cargarInicio():void{
    this.obtenerTotalesUsuarios();
    this.obtenerCantidadClubes();
  }

  public obtenerTotalesUsuarios(): void {
    if(this.isAdmin){
      this.obtenerCantidadUsuarios();
      this.obtenerCantidadUsuariosActivos();
      this.obtenerCantidadUsuariosInactivos();
    }

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

  public obtenerCantidadClubes():void {
    if(this.isEncargadoJugadores || this.isAdmin){
      this.clubService.cantidadTotalClubes().subscribe(data =>{
        this.cantidadTotalClubes = data;
      },err => {
        console.log(err.error);
        
      })
    }
  }



}
