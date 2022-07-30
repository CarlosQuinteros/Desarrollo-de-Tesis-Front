import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleGeneralPartidoDto } from 'src/app/core/Dtos/partidos/detalle-general-partido-dto';
import { Anotacion } from 'src/app/core/modelo/anotacion';
import { Club } from 'src/app/core/modelo/club';
import { Partido } from 'src/app/core/modelo/partido';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { CrearAnotacionComponent } from '../crear/crear-anotacion.component';
import Swal from 'sweetalert2';
import { EditarAnotacionComponent } from '../editar/editar-anotacion.component';

@Component({
  selector: 'app-lista-anotaciones',
  templateUrl: './lista-anotaciones.component.html',
  styleUrls: ['./lista-anotaciones.component.css'],
  providers: [DialogService]
})
export class ListaAnotacionesComponent implements OnInit {

  @Input() partido! : Partido
  @Input() club : Club = new Club('','','');
  @Output() detallePartido = new EventEmitter();

  anotaciones : Anotacion[] = [];
  loading : boolean = true;
  ref! : DynamicDialogRef;

  constructor(
    private partidoService : PartidosService,
    private dialogService : DialogService,
    private anotacionService : AnotacionService
  ) { }

  ngOnInit(): void {
    this.obtenerAnotacionesSegunClub();
  }

  obtenerAnotacionesSegunClub(): void {
    if(this.club.id === this.partido.clubLocal.id){
      this.obtenerAnotacionesClubLocal();
    }
    if(this.club.id === this.partido.clubVisitante.id){
      this.obtenerAnotacionesClubVisitante();
    }
  }

  obtenerAnotacionesClubLocal(): void {
    this.partidoService.anotacionesDelClubLocal(this.partido.id).toPromise().then(
      data => {
        this.anotaciones = data.sort((a, b)=> a.minuto - b.minuto);
        this.loading = false;
      }
    )
  }

  obtenerAnotacionesClubVisitante(): void {
    this.partidoService.anotacionesDelClubVisitante(this.partido.id).toPromise().then(
      data => {
        this.anotaciones = data.sort((a, b)=> a.minuto - b.minuto);
        this.loading = false;
      }
    )
  }

  showCrearAnotacion(): void {
    this.ref = this.dialogService.open(CrearAnotacionComponent,  {
      header:'Crear anotacion',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        partido : this.partido,
        club : this.club
      }
    })

    this.ref.onClose.subscribe(
      () => {
        this.obtenerAnotacionesSegunClub();
        let partido: DetalleGeneralPartidoDto = new DetalleGeneralPartidoDto(0, new Date(), '', '', '', '', 0, 0);
        this.partidoService.detalleDatosGeneralesPartido(this.partido.id).toPromise().then(
          data => {
            partido = data;
            this.detallePartido.emit(partido);
          }
        )
      })   
  }

  showEditarAnotacion(anotacion : Anotacion): void {
    this.ref = this.dialogService.open(EditarAnotacionComponent,  {
      header:'Editar anotacion',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        anotacion: anotacion
      }
    })

    this.ref.onClose.subscribe(
      () => {
        this.obtenerAnotacionesSegunClub();
        let partido: DetalleGeneralPartidoDto = new DetalleGeneralPartidoDto(0, new Date(), '', '', '', '', 0, 0);
        this.partidoService.detalleDatosGeneralesPartido(this.partido.id).toPromise().then(
          data => {
            partido = data;
            this.detallePartido.emit(partido);
          }
        )
      })
  }

  eliminarAnotation(anotacion : Anotacion):void{
    Swal.fire({
      title: '¿Eliinar anotacion?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.solicitarEliminacionAnotacion(anotacion.id);
      }
    })
  }

  solicitarEliminacionAnotacion(id: number):void{
    this.anotacionService.eliminarAnotacion(id).toPromise().then(
      data => {
        this.obtenerAnotacionesSegunClub();
        let partido: DetalleGeneralPartidoDto = new DetalleGeneralPartidoDto(0, new Date(), '', '', '', '', 0, 0);
        this.partidoService.detalleDatosGeneralesPartido(this.partido.id).toPromise().then(
          data => {
            partido = data;
            this.detallePartido.emit(partido);
          }
        )
        Swal.fire(data.mensaje, '', 'success');

      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

}
