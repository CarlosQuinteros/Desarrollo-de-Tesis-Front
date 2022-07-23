import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JugadorPartidoDto } from 'src/app/core/Dtos/participaciones-jugadores/jugador-partido-dto';
import { EstadoJugador } from 'src/app/core/modelo/estado-jugador';
import { Jugador } from 'src/app/core/modelo/jugador';
import { JugadorPartido } from 'src/app/core/modelo/jugador-partido';
import { Partido } from 'src/app/core/modelo/partido';
import { JugadorPartidoService } from 'src/app/servicios/jugador-partido.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-titular',
  templateUrl: './editar-titular.component.html',
  styleUrls: ['./editar-titular.component.css']
})
export class EditarTitularComponent implements OnInit {

  dniJugador : string = '';
  blockSpace: RegExp = /[^\s]/;
  jugador : Jugador = new Jugador('','','',new EstadoJugador(''));
  partido! : Partido;
  jugadorPartidoDto : JugadorPartidoDto = new JugadorPartidoDto(0,0,0,0,'JUG');
  posiciones : string[] = []
  participacionTitular! : JugadorPartido;

  constructor(
    private jugadorService : JugadorService,
    private jugadorPartidoService : JugadorPartidoService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.participacionTitular = {...this.config.data.participacion};
    this.jugador = this.participacionTitular.jugador;
    this.jugadorPartidoDto.nroCamiseta = this.participacionTitular.nroCamiseta;
    this.jugadorPartidoDto.posicion = this.participacionTitular.posicion;
    //console.log(this.participacionTitular);
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
  
  editarTitular(): void {
    let titular = {...this.jugadorPartidoDto};
    titular.idJugador = this.jugador.id!;
    this.jugadorPartidoService.editarParticipacion(titular, this.participacionTitular.id).toPromise().then(
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
