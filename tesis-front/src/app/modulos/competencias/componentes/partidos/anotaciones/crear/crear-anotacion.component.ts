import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { AnotacionDto } from 'src/app/core/Dtos/anotaciones/anotacion-dto';
import { Club } from 'src/app/core/modelo/club';
import { Jugador } from 'src/app/core/modelo/jugador';
import { JugadorPartido } from 'src/app/core/modelo/jugador-partido';
import { Partido } from 'src/app/core/modelo/partido';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-anotacion',
  templateUrl: './crear-anotacion.component.html',
  styleUrls: ['./crear-anotacion.component.css']
})
export class CrearAnotacionComponent implements OnInit {
  
  partido! : Partido;
  club : Club = new Club('','','');
  tipoGoles : string[] = [];
  jugadoresClubAnota : Jugador[] = [];
  jugadoresClubContrario : Jugador[] = [];
  jugadores : Jugador[] = [];
  jugadorAnotaSelected! : Jugador;
  anotacionDto : AnotacionDto = new AnotacionDto(0,0,0,0,'JUGADA_COLECTIVA')

  constructor(
    private anotacionService: AnotacionService,
    private partidoService: PartidosService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.partido = {... this.config.data.partido};
    this.club = {... this.config.data.club};        
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

  crearAnotacion(): void {
    let nuevaAnotacion = {...this.anotacionDto};
    nuevaAnotacion.idPartido = this.partido.id;
    nuevaAnotacion.idJugadorAnota = this.jugadorAnotaSelected.id!;
    nuevaAnotacion.idClubAnota = this.club.id;
    //console.log(nuevaAnotacion);
    this.anotacionService.crearAnotacion(nuevaAnotacion).toPromise().then(
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
