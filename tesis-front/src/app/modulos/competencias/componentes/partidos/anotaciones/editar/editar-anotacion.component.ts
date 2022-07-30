import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { AnotacionDto } from 'src/app/core/Dtos/anotaciones/anotacion-dto';
import { Anotacion } from 'src/app/core/modelo/anotacion';
import { Club } from 'src/app/core/modelo/club';
import { Jugador } from 'src/app/core/modelo/jugador';
import { Partido } from 'src/app/core/modelo/partido';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-anotacion',
  templateUrl: './editar-anotacion.component.html',
  styleUrls: ['./editar-anotacion.component.css']
})
export class EditarAnotacionComponent implements OnInit {

  partido! : Partido;
  club : Club = new Club('','','');
  tipoGoles : string[] = [];
  jugadoresClubAnota : Jugador[] = [];
  jugadoresClubContrario : Jugador[] = [];
  jugadores : Jugador[] = [];
  jugadorAnotaSelected! : Jugador;
  anotacionDto : AnotacionDto = new AnotacionDto(0,0,0,0,'JUGADA_COLECTIVA')
  anotacion! : Anotacion;

  constructor(
    private anotacionService: AnotacionService,
    private partidoService: PartidosService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.anotacion = {...this.config.data.anotacion}
    this.partido = {...this.anotacion.partido}
    this.club = {... this.anotacion.clubAnota};
    this.jugadorAnotaSelected = this.anotacion.jugador;
    this.anotacionDto.tipoGol = this.anotacion.tipoGol;
    this.anotacionDto.minuto = this.anotacion.minuto;
    this.obtenerTipoDeGoles();
    this.obtenerJugadores();    
    
  }

  obtenerTipoDeGoles(): void {
    this.anotacionService.tiposDeGol().toPromise().then(
      data => {
        this.tipoGoles = data;
      }
    )
  }

  obtenerJugadores(): void {
    forkJoin({
      titularesLocal : this.partidoService.titularesDelClubLocal(this.partido.id),
      suplentesLocal : this.partidoService.suplentesDelClubLocal(this.partido.id),
      titularesVisitante : this.partidoService.titularesDelClubVisitante(this.partido.id),
      suplentesVisitante : this.partidoService.suplentesDelClubVisitante(this.partido.id),
    }).subscribe(({titularesLocal, suplentesLocal, titularesVisitante, suplentesVisitante}) => {     
      if(this.club.id === this.partido.clubLocal.id){
        this.jugadoresClubAnota = titularesLocal.concat(suplentesLocal).map( j => j.jugador);
        this.jugadoresClubContrario = titularesVisitante.concat(suplentesVisitante).map( j => j.jugador);
        this.jugadores = this.jugadoresClubAnota;   

      }
      if(this.club.id === this.partido.clubVisitante.id){
        this.jugadoresClubAnota = titularesVisitante.concat(suplentesVisitante).map( j => j.jugador);
        this.jugadoresClubContrario = titularesLocal.concat(suplentesLocal).map( j => j.jugador);
        this.jugadores = this.jugadoresClubAnota;   
      }
    })
    
  }

  onChangeTipoGol(e : Event){
   this.jugadores = (this.anotacionDto.tipoGol === 'GOL_EN_CONTRA' ) ? this.jugadoresClubContrario : this.jugadoresClubAnota; 
  }

  editarAnotacion(): void {
    let editarAnotacion = {...this.anotacionDto};
    editarAnotacion.idPartido = this.partido.id;
    editarAnotacion.idJugadorAnota = this.jugadorAnotaSelected.id!;
    editarAnotacion.idClubAnota = this.club.id;
    this.anotacionService.editarAnotacion(editarAnotacion, this.anotacion.id).toPromise().then(
      data => {
        Swal.fire(data.mensaje,'', 'success');
        this.ref.close();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodyAnotacion',
        })
      }
    )
  }
}
