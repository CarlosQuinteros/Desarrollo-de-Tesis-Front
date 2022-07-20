import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Jornadas } from 'src/app/core/Dtos/fixture/jornadas';
import { JornadaDto } from 'src/app/core/Dtos/jornadas/jornada-dto';
import { Competencia } from 'src/app/core/modelo/competencia';
import { Jornada } from 'src/app/core/modelo/jornada';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import { JornadasService } from 'src/app/servicios/jornadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario-competencia',
  templateUrl: './calendario-competencia.component.html',
  styleUrls: ['./calendario-competencia.component.css'],
  providers: [DialogService]
})
export class CalendarioCompetenciaComponent implements OnInit{

  competencia : Competencia | null = null;
  calendario : Jornadas[] = [];
  home : MenuItem = {}
  items : MenuItem[] = [];
  idCompetencia : number = 0;
  constructor(
    private router :Router,
    private rutaActiva : ActivatedRoute,
    private competenciaService: CompetenciasService,
    private jornadaService: JornadasService,
    public dialogService: DialogService,
  ) { }


  ngOnInit(): void {
    this.idCompetencia = this.rutaActiva.snapshot.params.id;
    this.cargarItems();
    this.obtenerCompetencia();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'},
    this.items = [
      {label: 'Competencias', routerLink:'/competencias'},
      {label: 'Calendario', disabled:true}
    ]
  }

  obtenerCompetencia(): void {
    this.competenciaService.detalleCompetencia(this.idCompetencia).toPromise().then(
      data => {
        this.competencia = data;
        this.loadCalendario();
      },
      err => {
        Swal.fire('error', err.error.message, 'error');
      }
    )
  }

  loadCalendario(): void {
    const idCompetencia: number = this.idCompetencia;
    let calendario : Jornadas[] = [];
    
    this.competenciaService.listadoJornadasDeCompetencia(idCompetencia).toPromise().then(
      jornadas => {
        jornadas.forEach(jornada =>{
          this.jornadaService.listadoPartidosDeJornada(jornada.id).toPromise()
            .then(partidos => calendario.push(new Jornadas(jornada, partidos)))
            .then(() => this.calendario = calendario.sort((a, b) => a.jornada.numero - b.jornada.numero))
        })
      }
    )
    this.calendario = calendario;
    this.calendario.forEach(jornada => {
      jornada.partidos.forEach(partido => {
        partido.fecha = new Date(partido.fecha);
        console.log(partido);
        
      })
    })
    // console.log(calendario);
    // console.log(this.calendario);
  }

  cargarPartido(jornada : Jornada) {
    this.router.navigate([`/competencias/${this.idCompetencia}/calendario/jornada/${jornada.id}/partidos`]);
  }

  crearJornada(){
    const siguienteNumeroJornada : number = this.obtenerNumeroSiguienteJornada();
    const nuevaJornada : JornadaDto = new JornadaDto(
      siguienteNumeroJornada,
      `Fecha ${siguienteNumeroJornada}`,
      this.competencia!.id 
    )
    Swal.fire({
      title : '¿Crear nueva jornada?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.solicitarCreacionJornada(nuevaJornada);
      }
    })
    
  }

  solicitarCreacionJornada(nuevaJornada : JornadaDto){
    this.jornadaService.crearJornada(nuevaJornada).toPromise().then(
      data => {
        this.loadCalendario();
        //Swal.fire(data.mensaje, '', 'success')
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

  eliminarJornada(idJornada: number){
    Swal.fire({
      title: '¿Realmente deseas eliminar la jornada?',
      text: 'No se eliminará si tiene partidos',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    }).then((result)=>{
      if(result.isConfirmed){
        this.solicitarEliminacionJornada(idJornada);
      }
    })
  }

  solicitarEliminacionJornada(id: number){
    this.jornadaService.eliminarJornada(id).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success')
        this.loadCalendario();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

  obtenerNumeroSiguienteJornada(): number{
    let ultimaJornada : number | undefined = this.calendario.map(jornada => jornada.jornada.numero).pop();
    return ultimaJornada === undefined ? 1 : ultimaJornada + 1;
  }

}
