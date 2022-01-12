import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Jugador } from 'src/app/modelo/jugador';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-listado-jugadores',
  templateUrl: './listado-jugadores.component.html',
  styleUrls: ['./listado-jugadores.component.css']
})
export class ListadoJugadoresComponent implements OnInit {

  loading : boolean = true;
  jugadores : Jugador[] = [];
  jugadoresFiltrados : Jugador[] = [];
  isAdmin : boolean = false;
  isEncargadoJugadores : boolean = false;


  cols = [
    { field: 'id', header: 'ID', type: 'numeric' },
    { field: 'nombre', header: 'Nombres', type: 'text' },
    { field: 'apellidos', header: 'Apellidos', type:'text' },
    { field: 'documento', header: 'DNI', type:'text' },
    { field: 'fechaNacimiento', header: 'Fecha Nac.', type:'date'},
    { field: 'edad', header: 'Edad', type:'numeric'},
    { field: 'tarjetasAmarillasAcumuladas', header: 'Tarjetas', type:'numeric'},
    { field: 'estadoJugador.estadoJugador', header: 'Estado', type:'text'},
  ];

  exportColumns: any[] = [];

  constructor(private router: Router, private jugadorService: JugadorService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoJugadores = this.tokenService.isEncargadoJugadores();
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadorService.listaJugadores().toPromise().then(
      data => {
        this.jugadores = data;        
        this.jugadores.forEach(jugador =>{
          jugador.fechaNacimientoParsed = new Date(jugador.fechaNacimientoParsed);
          //(jugador.clubActual == null) ? null : jugador.clubActual;
        });
        this.loading = false;        
      })
  }

  clear(table : Table) {
    table.clear();
  }

  exportarPdf(table : Table){
    this.obtenerJugadoresFiltrados(table);
    //console.log(table.filters);
    //console.log(this.jugadoresFiltrados);
    this.jugadoresFiltrados = this.jugadores;
    this.obtenerFiltros(table);

  }

  exportarExcel(table: Table){
    this.obtenerJugadoresFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerJugadoresFiltrados(table: Table): void {
    this.jugadoresFiltrados = table.filteredValue != null ? table.filteredValue : this.jugadores;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

}
