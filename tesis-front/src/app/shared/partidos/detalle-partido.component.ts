import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleGeneralPartidoDto } from 'src/app/core/Dtos/partidos/detalle-general-partido-dto';
import { Competencia } from 'src/app/core/modelo/competencia';
import { Jornada } from 'src/app/core/modelo/jornada';
import { JornadasService } from 'src/app/servicios/jornadas.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-partidos',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartidoComponent implements OnInit {

  @Input() partidos: DetalleGeneralPartidoDto[] = [];
  @Input() accionesVisibles: boolean = false;
  
  constructor(
    private partidoService: PartidosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.partidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  classPorEstadoPartido(estado:string) : string {
    let estados : {[key: string]: string} = {
      PENDIENTE : 'me-2 bg-orange-200 text-orange-800 text-center',
      FINALIZADO : 'me-2 bg-green-200 text-green-800 text-center',
    }
    return estados[estado];
  }

  eliminarPartido(idPartido : number): void {
    Swal.fire({
      title : '¿Eliminar partido?',
      text:'No se eliminara si cuenta con incidencias',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.solicitarEliminacionPartido(idPartido);
      }
    })
  }

  solicitarEliminacionPartido(idPartido : number){
    let indicePartido = this.partidos.findIndex(p => p.idPartido === idPartido);
    this.partidoService.eliminarPartido(idPartido).toPromise().then(
      data => {
        this.partidos.splice(indicePartido,1);
        Swal.fire(data.mensaje, '', 'success');
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }
  
  navegarAEdicionPartido(idPartido : number): void {
    this.router.navigate([`/competencias/partido/${idPartido}/editar`])
  }

}
