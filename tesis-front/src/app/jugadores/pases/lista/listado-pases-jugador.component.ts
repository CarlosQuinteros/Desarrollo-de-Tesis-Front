import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DetalleJugadorDto } from 'src/app/Dtos/jugadores/detalle-jugador-dto';
import { Jugador } from 'src/app/modelo/jugador';
import { Pase } from 'src/app/modelo/pase';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado-pases-jugador',
  templateUrl: './listado-pases-jugador.component.html',
  styleUrls: ['./listado-pases-jugador.component.css']
})
export class ListadoPasesJugadorComponent implements OnInit {

  loading = true;
  msj : string = '';
  fechaCorta : string = 'dd/MM/yyyy';
  detalleJugador  = <DetalleJugadorDto> {}
  pasesFiltrados : Pase[] = [];
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(private router: Router, private jugadorService: JugadorService, private rutaActiva : ActivatedRoute) { }

  ngOnInit(): void {
    const idJugador = this.rutaActiva.snapshot.params.id;
    this.cargarItems();
    this.obtenerDetalleJugador(idJugador);
  }

  cargarItems(): void {
    this.items = [
      {label:'Jugadores', routerLink:'/jugadores/lista'},
      {label:'Pases', disabled:true}
    ];
    this.home = this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

  obtenerDetalleJugador(idJugador: number){
    this.jugadorService.detalleJugador(idJugador).toPromise().then(
      data => {
        this.detalleJugador = data;
        this.detalleJugador.historialClubes.forEach(pase =>{
          pase.fechaParsed = new Date(pase.fechaParsed);
          pase.fechaDesdeParsed = new Date(pase.fechaDesdeParsed);
          (pase.fechaHastaParsed != null) ? pase.fechaHastaParsed = new Date(pase.fechaHastaParsed): null;
        })
        this.detalleJugador.jugador.fechaNacimientoParsed = new Date(this.detalleJugador.jugador.fechaNacimientoParsed);
        this.loading = false;
      },
      err => {
        this.router.navigate(["jugadores/lista"]);
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  clear(table : Table) {
    table.clear();
  }

  exportarPdf(table : Table){
    this.obtenerPasesFiltrados(table);
    console.log(table.filters);
    console.log(this.pasesFiltrados);
    this.pasesFiltrados = this.detalleJugador.historialClubes;
    this.obtenerFiltros(table);

  }

  exportarExcel(table: Table){
    this.obtenerPasesFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerPasesFiltrados(table: Table): void {
    this.pasesFiltrados = table.filteredValue != null ? table.filteredValue : this.detalleJugador.historialClubes;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      //console.log(f.value);
      //console.log(f.matchMode);
      
    })
  }


}
