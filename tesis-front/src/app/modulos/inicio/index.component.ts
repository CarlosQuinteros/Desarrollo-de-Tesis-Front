import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/servicios/club.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import PasesService from 'src/app/servicios/pases.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
  cantidadTotalJugadores : number = 0;
  cantidadTotalPases : number = 0;

  constructor(private tokenService: TokenService, 
    private router: Router, 
    private usuarioService: UsuarioService, 
    private clubService: ClubService,
    private jugadorService: JugadorService,
    private pasesJugService: PasesService) { }

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
    this.obtenerCantidadJugadores();
    this.obtenerCantidadTotalPases();
  }

  public obtenerTotalesUsuarios(): void {
    if(this.isAdmin){
      this.obtenerCantidadUsuarios();
      this.obtenerCantidadUsuariosActivos();
      this.obtenerCantidadUsuariosInactivos();
    }

  }

  public obtenerCantidadUsuarios():void{
    this.usuarioService.getCantidadUsuarios().toPromise().then(data =>{
        this.cantidadUsuarios = data;
    })
  }

  public obtenerCantidadUsuariosActivos():void{
    this.usuarioService.getCantidadUsuariosActivos().toPromise().then(data =>{
      this.cantidadActivos = data;
    })
  }

  public obtenerCantidadUsuariosInactivos():void{
    this.usuarioService.getCantidadUsuariosInactivos().toPromise().then(data =>{
      this.cantidadInactivos = data;
    })
  }

  public obtenerCantidadClubes():void {
    if(this.isEncargadoJugadores || this.isAdmin){
      this.clubService.cantidadTotalClubes().toPromise().then(data =>{
        this.cantidadTotalClubes = data;
      },err => {
        console.log(err.error);
        
      })
    }
  }

  public obtenerCantidadJugadores():void{
    if(this.isEncargadoJugadores || this.isAdmin || this.isUser){
      this.jugadorService.cantidadTotalJugadores().toPromise().then(
        data =>{
          this.cantidadTotalJugadores = data;
        },err=>{
          console.log(err.error);
          
        }
      )
    }
  }

  public obtenerCantidadTotalPases():void {
    if(this.isAdmin || this.isEncargadoJugadores){
      this.pasesJugService.cantidadPases().toPromise().then(
        data =>{
          this.cantidadTotalPases = data;
        },err=>{
          console.log(err.error.message);
          
        }
      )
    }
  }



}
