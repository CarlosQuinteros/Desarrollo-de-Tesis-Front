import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Juez } from 'src/app/core/modelo/juez';
import { JuezService } from 'src/app/servicios/juez.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-jueces',
  templateUrl: './lista-jueces.component.html',
  styleUrls: ['./lista-jueces.component.css']
})
export class ListaJuecesComponent implements OnInit {

  jueces : Juez[] = [];
  loading : boolean = true;
  constructor(
    private juezService : JuezService
  ) { }

  ngOnInit(): void {
    this.cargarJueces();
  }

  clear(table : Table) {
    table.clear();
  }

  cargarJueces() : void {
    this.juezService.listadoJueces().subscribe(
      data => {
        this.jueces = data;
        this.loading = false;
      }
    )
  }

  eliminarJuez(id: number){
    Swal.fire({
      title:'¿Realmente deseas eliminar el juez?',
      text: 'No se eliminará si tiene transacciones con partidos',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then(result => {
      if(result.isConfirmed){
        this.solicitarEliminacionJuez(id);
      }
    })
  }

  solicitarEliminacionJuez(id: number){
    this.juezService.eliminarJuez(id).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.cargarJueces();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

}
