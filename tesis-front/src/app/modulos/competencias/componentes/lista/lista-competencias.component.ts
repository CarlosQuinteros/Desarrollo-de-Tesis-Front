import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Competencia } from 'src/app/core/modelo/competencia';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-competencias',
  templateUrl: './lista-competencias.component.html',
  styleUrls: ['./lista-competencias.component.css']
})
export class ListaCompetenciasComponent implements OnInit {

  competencias : Competencia[] = [];
  loading : boolean = true;

  constructor(
    private router: Router,
    private competenciaService: CompetenciasService
  ) { }

  ngOnInit(): void {
    this.obtenerListadoCompetencias();
  }

  clear(table : Table){
    table.clear();
  }

  clasePorEstadoCompetencia(estado : string){
    const claseEstado : {[key: string]: string} = {
      PENDIENTE :'p-tag bg-pink-200 text-pink-800 text-center',
      EN_CURSO : 'p-tag bg-orange-200 text-orange-800 text-center',
      FINALIZADO : 'p-tag bg-green-200 text-green-800 text-center'
    }
    return claseEstado[estado];
  }

  obtenerListadoCompetencias(): void {
    this.competenciaService.listadoCompetencias().subscribe(
      data => {
        this.competencias = data;
        this.loading = false;
      },
      err => {
        console.log(err.error);
        
      }
    )
  }

  eliminarCompetencia(idCompetencia : number): void {
    Swal.fire({
      title: '¿Realmente deseas eliminar la competencia?',
      text: 'No se eliminará si tiene jornadas y partidos asociados',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    }).then((result)=>{
      if(result.isConfirmed){
        this.solicitarEliminacion(idCompetencia);
      }
    })
  }

  solicitarEliminacion(idCompetencia : number): void {
    this.competenciaService.eliminarCompetencia(idCompetencia).subscribe(
      data => {
        Swal.fire(data.mensaje, '', 'success');
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

}
