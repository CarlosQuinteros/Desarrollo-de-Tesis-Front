import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JugadorPartidoDto } from 'src/app/core/Dtos/participaciones-jugadores/jugador-partido-dto';
import { EstadoJugador } from 'src/app/core/modelo/estado-jugador';
import { Jugador } from 'src/app/core/modelo/jugador';
import { Partido } from 'src/app/core/modelo/partido';
import { JugadorPartidoService } from 'src/app/servicios/jugador-partido.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-titular',
  templateUrl: './crear-titular.component.html',
  styleUrls: ['./crear-titular.component.css']
})
export class CrearTitularComponent implements OnInit {

  dniJugador : string = '';
  blockSpace: RegExp = /[^\s]/;
  jugador : Jugador = new Jugador('','','',new EstadoJugador(''));
  partido! : Partido;
  jugadorPartidoDto : JugadorPartidoDto = new JugadorPartidoDto(0,0,0,0,'JUG');
  posiciones : string[] = []
  constructor(
    private jugadorService : JugadorService,
    private jugadorPartidoService : JugadorPartidoService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.jugadorPartidoDto.idPartido = parseInt(this.config.data.idPartido);
    this.jugadorPartidoDto.idClub = parseInt(this.config.data.idClub);
    //console.log(this.jugadorPartidoDto);
    this.obtenerPosiciones();
  }

  obtenerJugador(): void {
    this.jugadorService.detalleJugadorPorDni(this.dniJugador).toPromise().then(
      data => {
        this.jugador = data.jugador;
        //console.log(this.jugador);
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodyJugador',
        })
      }
    )
  }

  obtenerPosiciones(): void {
    this.jugadorPartidoService.posiciones().toPromise().then(
      data => {
        this.posiciones = data;
      }
    )
  }
  
  crearTitular(): void {
    let nuevoTitular = {...this.jugadorPartidoDto};
    nuevoTitular.idJugador = this.jugador.id!;
    this.jugadorPartidoService.crearTitular(nuevoTitular).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.ref.close();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodyJugador',
        })
      }
    )    
  }

}
