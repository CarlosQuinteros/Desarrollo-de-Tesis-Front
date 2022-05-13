import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { AsociacionDeportiva } from 'src/app/core/modelo/asociacion-deportiva';
import { AsociacionDeportivaService } from 'src/app/servicios/asociacion-deportiva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-asociaciones-deportivas',
  templateUrl: './lista-asociaciones-deportivas.component.html',
  styleUrls: ['./lista-asociaciones-deportivas.component.css']
})
export class ListaAsociacionesDeportivasComponent implements OnInit {

  asociacionesDeportivas : AsociacionDeportiva[] = []
  loading : boolean = true;

  constructor(
    private httpClient : HttpClient,
    private asociacionesDeportivasService : AsociacionDeportivaService
  ) { }

  ngOnInit(): void {
    this.cargarAsociacionesDeportivas();
  }

  clear(table : Table) {
    table.clear();
  }

  cargarAsociacionesDeportivas(): void {
    this.asociacionesDeportivasService.listadoAsociaciones().subscribe(
      data => {
        this.asociacionesDeportivas = data;
        this.loading = false;
      }
    )
  }

  eliminarAsociacion(id: number): void {
    Swal.fire(
      {
        title:'¿Realmente deseas eliminar la Asociacion?',
        text: 'No se eliminará si tiene transacciones con torneos',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }
    ).then(
      result=> {
        if(result.isConfirmed){
          this.solicitarEliminacionAsociacion(id);
        }
      }
    )
  }

  solicitarEliminacionAsociacion(id: number): void {
    this.asociacionesDeportivasService.eliminarAsociacion(id).subscribe(
      data => {
        this.cargarAsociacionesDeportivas();
        Swal.fire(data.mensaje, '', 'success');
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

}
