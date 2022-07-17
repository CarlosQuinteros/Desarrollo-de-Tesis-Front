import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { PartidoDto } from 'src/app/core/Dtos/partidos/partido-dto';
import { Club } from 'src/app/core/modelo/club';
import { Competencia } from 'src/app/core/modelo/competencia';
import { Jornada } from 'src/app/core/modelo/jornada';
import { Partido } from 'src/app/core/modelo/partido';
import { ClubService } from 'src/app/servicios/club.service';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import { JornadasService } from 'src/app/servicios/jornadas.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-partido',
  templateUrl: './editar-partido.component.html',
  styleUrls: ['./editar-partido.component.css']
})
export class EditarPartidoComponent implements OnInit {

  partidoDto : PartidoDto = new PartidoDto(new Date(), '',0,0,0);
  clubesParticipantes: Club[] = [];
  home : MenuItem = {}
  items : MenuItem[] = [];
  competencia! : Competencia;
  jornada! : Jornada;
  partido! : Partido;
  idPartido : number = 0;

  constructor(
    private partidoService: PartidosService,
    private router: Router,
    private rutaActiva : ActivatedRoute,
    private location: Location
  ) {
   }

  ngOnInit(): void {
    this.idPartido = this.rutaActiva.snapshot.params.idPartido;
    this.obtenerPartido(this.idPartido);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label: 'Competencias', routerLink:'/competencias'},
      {label: `${this.competencia.nombre}`,routerLink:`/competencias/${this.competencia.id}/calendario`},
      {label: `Fecha ${this.jornada.numero}`},
      {label: 'Editar Partido', disabled: true}
    ];
  }

  obtenerPartido(idPartido : number): void {
    this.partidoService.detallePartido(idPartido).toPromise().then(
      data => {
        this.competencia = data.jornada.competencia;
        this.clubesParticipantes = data.jornada.competencia.clubesParticipantes;
        this.jornada = data.jornada;
        this.partido = data;
        this.partido.fecha = new Date (data.fecha);
       
        this.cargarItems();
        
      },
      err=>{
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  editarPartido(): void {
    Swal.fire({
      title: '¿Realmente deseas editar el partido?',
      text: 'Si cuenta con incidencias de jugadores, solo se editará el horario y las observaciones',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEdicionPartido();
      }
    })
  }

  solicitarEdicionPartido(): void {
    let partidoEditarDto = new PartidoDto(this.partido.fecha, this.partido.observaciones, this.partido.clubLocal.id, this.partido.clubVisitante.id,this.jornada!.id);
    //console.log(partidoEditarDto);
    this.partidoService.editarPartido(this.partido.id,partidoEditarDto).toPromise().then(
      data => {
        Swal.fire(data.mensaje, 'Te redireccionamos a la jornada', 'success');
        this.location.back();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
    
  }

  navegarACalendario(): void {
    this.router.navigate([`/competencias/${this.competencia.id}/calendario`]);
  }



}
