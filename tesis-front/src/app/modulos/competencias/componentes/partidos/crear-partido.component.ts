import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleGeneralPartidoDto } from 'src/app/core/Dtos/partidos/detalle-general-partido-dto';
import { PartidoDto } from 'src/app/core/Dtos/partidos/partido-dto';
import { Club } from 'src/app/core/modelo/club';
import { Competencia } from 'src/app/core/modelo/competencia';
import { Jornada } from 'src/app/core/modelo/jornada';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import { JornadasService } from 'src/app/servicios/jornadas.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.component.html',
  styleUrls: ['./crear-partido.component.css']
})
export class CrearPartidoComponent implements OnInit{

  partidoDto : PartidoDto = new PartidoDto(new Date(), '',0,0,0);
  clubesParticipantes: Club[] = [];
  fechaPartido : Date | null = null;
  home : MenuItem = {}
  items : MenuItem[] = [];
  competencia! : Competencia
  jornada! : Jornada
  partidosDeJornada : DetalleGeneralPartidoDto[] = [];
  idCompetencia : number = 0;
  idJornada : number = 0;

  constructor(
    private partidoService:PartidosService,
    private competenciaService: CompetenciasService,
    private jornadaService : JornadasService,
    private rutaActiva : ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.idCompetencia = this.rutaActiva.snapshot.params.idCompetencia;
    this.idJornada = this.rutaActiva.snapshot.params.idJornada;
    this.obtenerCompetencia(this.idCompetencia);
    this.obtenerJornada(this.idJornada);

  }

  obtenerCompetencia(idCompetencia:number):void {
    this.competenciaService.detalleCompetencia(idCompetencia).toPromise().then(
      data => {
        this.competencia = data;
        this.clubesParticipantes = data.clubesParticipantes;
        this.jornadaService.listadoPartidosDeJornada(this.idJornada).toPromise().then(
          partidos => {
            this.partidosDeJornada = partidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
            this.cargarItems();

          },err => {
            Swal.fire('Error', err.error.message, 'error')
            this.router.navigate([`/competencias/${idCompetencia}/calendario`]);
          }
        )
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
        this.router.navigate(['/competencias']);
      }
    )
  }

  obtenerJornada(idJornada: number): void {
    this.jornadaService.detalleJornada(idJornada).subscribe(
      data => {
        this.jornada = data;
      },err => {
        Swal.fire('Error', err.error.message, 'error');
        this.router.navigate([`/competencias/${this.idCompetencia}/calendario`]);
      }
    )
  }

  cargarItems(): void {
    this.home= {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items =[
      {label:'Compentencias',routerLink:'/competencias'},
      {label: `${this.competencia.nombre}`, routerLink:`/competencias/${this.idCompetencia}/calendario`},
      {label:`Fecha ${this.jornada.numero}`},
      {label:'Crear Partido', disabled:true}
    ]
  }

  navegarACalendario(): void {
    this.router.navigate([`/competencias/${this.idCompetencia}/calendario`]);
  }

  crearPartido(form: NgForm): void {
    let nuevoPartido = {...this.partidoDto};
    nuevoPartido.idJornada = this.idJornada;
    nuevoPartido.fecha = this.fechaPartido!;
    //console.log(nuevoPartido.fecha.toISOString());
    this.partidoService.crearPartido(nuevoPartido).toPromise().then(
      data => {
        Swal.fire(data.mensaje,'', 'success');
        this.jornadaService.listadoPartidosDeJornada(this.idJornada).toPromise().then(
          partidos => {
            this.partidosDeJornada = partidos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
            form.resetForm();
          },err => {
            Swal.fire('Error', err.error.message, 'error')
            this.router.navigate([`/competencias/${this.idCompetencia}/calendario`]);
          }
        )
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

}
