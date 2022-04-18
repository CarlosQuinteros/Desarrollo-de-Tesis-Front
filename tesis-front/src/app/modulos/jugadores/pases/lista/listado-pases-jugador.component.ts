import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DetalleJugadorDto } from 'src/app/core/Dtos/jugadores/detalle-jugador-dto';
import { Club } from 'src/app/core/modelo/club';
import { Jugador } from 'src/app/core/modelo/jugador';
import { Pase } from 'src/app/core/modelo/pase';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado-pases-jugador',
  templateUrl: './listado-pases-jugador.component.html',
  styleUrls: ['./listado-pases-jugador.component.css']
})
export class ListadoPasesJugadorComponent implements OnInit {

  loading = true;
  msj: string = '';
  fechaCorta: string = 'dd/MM/yyyy';
  detalleJugador = <DetalleJugadorDto>{
    jugador:{
      apellidos:'',
      nombre: '',
      documento:'',
    }
  }
  pasesFiltrados: Pase[] = [];
  home: MenuItem = {}
  items: MenuItem[] = [];

  constructor(private router: Router, private jugadorService: JugadorService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    const idJugador = this.rutaActiva.snapshot.params.id;
    this.cargarItems();
    this.obtenerDetalleJugador(idJugador);
  }

  cargarItems(): void {
    this.items = [
      { label: 'Jugadores', routerLink: '/jugadores/lista' },
      { label: 'Pases', disabled: true }
    ];
    this.home = this.home = { icon: 'pi pi-home', routerLink: '/inicio' };
  }

  obtenerDetalleJugador(idJugador: number) {
    this.jugadorService.detalleJugador(idJugador).toPromise().then(
      data => {
        this.detalleJugador = data;
        this.detalleJugador.historialClubes.forEach(pase => {
          pase.fechaParsed = new Date(pase.fechaParsed);
          pase.fechaDesdeParsed = new Date(pase.fechaDesdeParsed);
          (pase.fechaHastaParsed != null) ? pase.fechaHastaParsed = new Date(pase.fechaHastaParsed) : null;
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

  
  clubActualJugador():string{
    let club: Club = this.detalleJugador.jugador.clubActual;
    return club != null ? club.nombreClub : 'Actualmente sin club';
  }

  getTagServerityClubActual():string{
    return this.detalleJugador.jugador.clubActual === null ? 'danger' : '';
  }

  clear(table: Table) {
    table.clear();
  }

  exportarPdf(table: Table) {
    this.obtenerPasesFiltrados(table);
    console.log(table.filters);
    console.log(this.pasesFiltrados);
    this.pasesFiltrados = this.detalleJugador.historialClubes;
    this.obtenerFiltros(table);

  }

  exportarExcel(table: Table) {
    this.obtenerPasesFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerPasesFiltrados(table: Table): void {
    this.pasesFiltrados = table.filteredValue != null ? table.filteredValue : this.detalleJugador.historialClubes;
  }

  obtenerFiltros(table: Table): void {
    let filtros: any = [];
    filtros = table.filters
    filtros.id.forEach((f: { "value": any, "matchMode": any; }) => {
      //console.log(f.value);
      //console.log(f.matchMode);

    })
  }

  eliminarPase(idPase: number) {
    let paseAEliminar: Pase = this.detalleJugador.historialClubes.find(f => f.id === idPase)!;
    let textoMensaje: string = paseAEliminar.fechaHastaParsed == null ? "El jugador se quedara sin club luego de esta operacion" : '';
    Swal.fire({
      title: 'Realmente deseas eliminar el Pase del Jugador?',
      text: textoMensaje,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.soliciarEliminacionPase(idPase);
      }
    })
  }

  soliciarEliminacionPase(id: number): void {
    this.jugadorService.eliminarPase(id).toPromise().then(
      data => {
        this.obtenerDetalleJugador(this.rutaActiva.snapshot.params.id);
        Swal.fire(data.mensaje , '', 'success');
      },
      err => {
        Swal.fire(err.error.message,'', 'error');
      }
    )
  }




}
