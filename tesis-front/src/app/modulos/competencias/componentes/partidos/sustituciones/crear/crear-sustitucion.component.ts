import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SustitucionDto } from 'src/app/core/Dtos/sustituciones/sustitucion-dto';
import { Club } from 'src/app/core/modelo/club';
import { EstadoJugador } from 'src/app/core/modelo/estado-jugador';
import { Jugador } from 'src/app/core/modelo/jugador';
import { Partido } from 'src/app/core/modelo/partido';
import { JugadorPartidoService } from 'src/app/servicios/jugador-partido.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { SustitucionService } from 'src/app/servicios/sustitucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-sustitucion',
  templateUrl: './crear-sustitucion.component.html',
  styleUrls: ['./crear-sustitucion.component.css']
})
export class CrearSustitucionComponent implements OnInit {
  
  partido! : Partido;
  club : Club = new Club('','','');
  jugadores : Jugador[]= [];
  jugadorEntraSelected! : Jugador;
  jugadorSaleSelected! : Jugador ;
  sustitucionDto : SustitucionDto= new SustitucionDto(0,0,0,0,0);

  constructor(
    private jugadorService : JugadorService,
    private jugadorPartidoService : JugadorPartidoService,
    private sustitucionService : SustitucionService,
    private partidoService : PartidosService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.partido = this.config.data.partido;
    this.club = this.config.data.club;
        
    this.obtenerJugadoresSegunClub();
  }

  obtenerJugadoresSegunClub(): void {
    if(this.club.id === this.partido.clubLocal.id){
      this.obtenerJugadoresClubLocal();
      //console.log(`club local id: ${this.club.id}`);
      
    }
    if(this.club.id === this.partido.clubVisitante.id){
      this.obtenerJugadoresClubVisitante();
      //console.log(`club visitante id: ${this.club.id}`);
    }
  }

  obtenerJugadoresClubLocal(): void {
    this.partidoService.titularesDelClubLocal(this.partido.id).toPromise().then(
      titulares => {
        this.jugadores = titulares.map(participacion => participacion.jugador);
        this.partidoService.suplentesDelClubLocal(this.partido.id).toPromise().then(
          suplentes => {
            this.jugadores= this.jugadores.concat(suplentes.map(participacion =>participacion.jugador));
          }
        )
      }
    )
  }

  obtenerJugadoresClubVisitante(): void {
    this.partidoService.titularesDelClubVisitante(this.partido.id).toPromise().then(
      titulares => {
        this.jugadores = titulares.map(participacion => participacion.jugador);
        this.partidoService.suplentesDelClubVisitante(this.partido.id).toPromise().then(
          suplentes => {
            this.jugadores= this.jugadores.concat(suplentes.map(participacion =>participacion.jugador));
          }
        )
      }
    )
  }

  crearSustitucion(): void {
    let nuevaSustitucion = {...this.sustitucionDto};
    nuevaSustitucion.idPartido = this.partido.id;
    nuevaSustitucion.idClubSustituye = this.club.id;
    nuevaSustitucion.idJugadorEntra = this.jugadorEntraSelected.id!;
    nuevaSustitucion.idJugadorSale = this.jugadorSaleSelected.id!;
    
    this.sustitucionService.crearSustitucion(nuevaSustitucion).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.ref.close();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodySustitucion',
        })
      }
    )

  }

}
