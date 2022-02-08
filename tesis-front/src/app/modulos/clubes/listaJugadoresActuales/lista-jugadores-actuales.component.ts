import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Club } from 'src/app/core/modelo/club';
import { Jugador } from 'src/app/core/modelo/jugador';
import { ClubService } from 'src/app/servicios/club.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-jugadores-actuales',
  templateUrl: './lista-jugadores-actuales.component.html',
  styleUrls: ['./lista-jugadores-actuales.component.css']
})
export class ListaJugadoresActualesComponent implements OnInit {

  loading : boolean = true;
  club :Club = new Club('','','');
  jugadores : Jugador[] = []
  isAdmin : boolean = false;
  isEncargadoJugadores : boolean = false;
  msj : string = '';
  jugadoresActuales: boolean = false;
  exJugadores : boolean = true;
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(private jugadorService :JugadorService, private clubService :ClubService, private rutaActiva: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    this.obtenerClub(id);
    this.cargarJugadores(id);
  }

  cargarItems(): void {
    this.items = [
      {label: 'Clubes', routerLink:'/clubes/lista'},
      {label: this.club.nombreClub},
      {label: 'Jugadores', disabled:true}
    ];
    this.home = this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

  cargarJugadores(idClub: number): void {
    this.jugadorService.jugadoresActualesPorClub(idClub).subscribe(
      data => {
        this.jugadores = data;
        this.jugadores.forEach(jugador =>jugador.fechaNacimientoParsed = new Date(jugador.fechaNacimientoParsed));
        this.loading = false;        
      },err=>{
        this.loading = false;
      })
  }

  clear(table : Table) {
    table.clear();
  }

  obtenerClub(id:number){
    this.clubService.detalleClub(id).toPromise().then(
      data => {
        this.club = data;
        this.cargarItems();        
      },err => {
        this.msj = err.error.message;
        this.router.navigate(["clubes/lista"]);
        Swal.fire('Error', this.msj,'error');
        this.loading = false;
      }
    )
  }

  mostrarExJuagdores(): void {
    this.exJugadores = false;
    this.jugadoresActuales  = true;
    this.jugadorService.exJugadoresPorClub(this.club.id).toPromise().then(
      data => {
        this.jugadores = data;
        this.jugadores.forEach(jugador =>jugador.fechaNacimientoParsed = new Date(jugador.fechaNacimientoParsed));

      }
    )
  }
  mostrarJuagdoresActuales(): void {
    this.exJugadores = true;
    this.jugadoresActuales = false;
    this.cargarJugadores(this.club.id);
  }


}
