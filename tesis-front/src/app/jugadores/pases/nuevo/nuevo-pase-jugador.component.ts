import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CambioDeClubDto } from 'src/app/Dtos/jugadores/cambio-de-club-dto';
import { Club } from 'src/app/modelo/club';
import { EstadoJugador } from 'src/app/modelo/estado-jugador';
import { Jugador } from 'src/app/modelo/jugador';
import { ClubService } from 'src/app/servicios/club.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import PasesService from 'src/app/servicios/pases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-pase',
  templateUrl: './nuevo-pase-jugador.component.html',
  styleUrls: ['./nuevo-pase-jugador.component.css']
})
export class NuevoPaseJugadorComponent implements OnInit {

  idJugador : number = 0;
  jugador : Jugador = new Jugador('','','',new EstadoJugador(''));
  clubes : Club[] = [];
  nuevoPase = <CambioDeClubDto>{}
  fechaCorta : string = 'dd/MM/yyyy';
  fechaActual : Date = new Date();
  //yearActual : string = this.fechaActual.toISOString().split("T")[0].split("-")[0];
  yearActual: string = this.fechaActual.toLocaleDateString().split("/")[2];

  constructor(
      private jugadorService: JugadorService,
      private router: Router,
      private rutaActiva : ActivatedRoute,
      private clubService: ClubService, private pasesJugService: PasesService) { }

  ngOnInit(): void {
    this.idJugador = this.rutaActiva.snapshot.params.id;
    this.nuevoPase.fecha = new Date();
    this.obtenerJugador();
    this.obtenerClubes();
    
    
  }

  obtenerJugador(): void {
    this.jugadorService.detalleJugador(this.idJugador).toPromise().then(
      data => {
        this.jugador = data.jugador;
        this.jugador.fechaNacimientoParsed = new Date(this.jugador.fechaNacimientoParsed);
        this.nuevoPase.idJugador = data.jugador.id;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
        this.router.navigate(['/jugadores/lista']);
      }
    )
  }

  obtenerClubes(): void {
    this.nuevoPase.idClub = 0;
    this.clubService.listaClubes().toPromise().then(
      data => {
        this.clubes = data;
      },
      err => {
        console.log(err.error.message);
        
      }
    )
  }

  crearNuevoPase(form: NgForm): void {
    let clubSelccionado : Club = this.clubes.filter( c => c.id == this.nuevoPase.idClub)[0];
    //console.log(this.nuevoPase);
    Swal.fire({
      title: '¿Realmente deseas cambiar de club al jugador?',
      text: `El jugador tendrá a ${clubSelccionado.nombreClub}, como su club actual`,
      icon: 'question',
      confirmButtonText: 'Crear Pase',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.solicitarCreacionPase(form);
    })
  }

  solicitarCreacionPase(form: NgForm):void {
    this.jugadorService.crearNuevoPase(this.nuevoPase).toPromise().then(
      data => {
        Swal.fire(data.mensaje, 'Te redireccionamos al historial del jugador', 'success');
        this.router.navigate([`/jugadores/historialClubes/${this.idJugador}`]);
      },
      err => {
        Swal.fire('Error',err.error.message, 'error');
      }
    )
  }

}
