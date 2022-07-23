import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Club } from 'src/app/core/modelo/club';
import { JugadorPartido } from 'src/app/core/modelo/jugador-partido';
import { Partido } from 'src/app/core/modelo/partido';
import { JugadorPartidoService } from 'src/app/servicios/jugador-partido.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';
import { CrearTitularComponent } from '../crear/crear-titular.component';
import { EditarTitularComponent } from '../editar/editar-titular.component';

@Component({
  selector: 'app-lista-jugadores-titulares',
  templateUrl: './lista-jugadores-titulares.component.html',
  styleUrls: ['./lista-jugadores-titulares.component.css'],
  providers: [DialogService]
})
export class ListaJugadoresTitularesComponent implements OnInit, OnDestroy {


  @Input() partido! : Partido
  @Input() club : Club = new Club('','','');
  titulares : JugadorPartido[] = [];
  loading : boolean = true;
  ref! : DynamicDialogRef;

  constructor(
    private jugadorPartidoService : JugadorPartidoService,
    private partidoService : PartidosService,
    public dialogService : DialogService
  ) { }
  

  ngOnInit(): void {
    this.obtenerTitularesSegunClub();

  }

  obtenerTitularesSegunClub(): void {
    if(this.club.id === this.partido.clubLocal.id){
      this.obtenerTitularesClubLocal();
      //console.log(`club local id: ${this.club.id}`);
    }
    if(this.club.id === this.partido.clubVisitante.id){
      this.obtenerTitularesClubVisitante();
      //console.log(`club visitante id: ${this.club.id}`);

    }
  }

  obtenerTitularesClubLocal(): void {
    this.partidoService.titularesDelClubLocal(this.partido.id).toPromise().then(
      data => {
        this.titulares = data;        
        this.loading = false;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  obtenerTitularesClubVisitante(): void {
    this.partidoService.titularesDelClubVisitante(this.partido.id).toPromise().then(
      data => {
        this.titulares = data;
        this.loading = false;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  showCrearTitular(): void {
    this.ref = this.dialogService.open(CrearTitularComponent,  {
      header:'Crear titular',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        idPartido : this.partido.id,
        idClub : this.club.id
      }
    })

    this.ref.onClose.subscribe(() => {
      this.obtenerTitularesSegunClub()})
  }

  showEditarTitular(participacion : JugadorPartido): void {
    this.ref = this.dialogService.open(EditarTitularComponent,  {
      header:'Editar titular',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        participacion : {...participacion}
      }
    })

    this.ref.onClose.subscribe(() => {
      this.obtenerTitularesSegunClub()})
  }
  

  eliminarParticipacionJugador(idParticipacion: number){
    Swal.fire({
      icon:'question',
      title:'¿Eliminar Participacion?',
      text:'No se eliminara si el jugador tiene incidencias en goles, sustituciones o tarjetas',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText:'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEliminacionParticipacion(idParticipacion);
      }
    })
  }


  solicitarEliminacionParticipacion(idParticipacion: number) {
    this.jugadorPartidoService.eliminarParticipacionJugador(idParticipacion).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.obtenerTitularesSegunClub();
      },
      err => {
        Swal.fire(err.error.message, '', 'error');
      }
    )
  }

  textClassPorPosicion(posicion: string):string{
    let posiciones : {[key: string]: string} ={
      ARQ: 'text-orange-700 font-bold',
      DEF: 'text-blue-700 font-bold',
      MED: 'text-green-700 font-bold',
      DEL: 'text-pink-600 font-bold',
      JUG: 'text-indigo-700 font-bold'
    }
    return posiciones[posicion];
  }

  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }

}
