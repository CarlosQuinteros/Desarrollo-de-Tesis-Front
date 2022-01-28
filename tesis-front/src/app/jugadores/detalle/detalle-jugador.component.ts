import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleJugadorDto } from 'src/app/Dtos/jugadores/detalle-jugador-dto';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2';
import { EditarJugador } from 'src/app/Dtos/jugadores/editar-jugador';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.component.html',
  styleUrls: ['./detalle-jugador.component.css'],
})
export class DetalleJugadorComponent implements OnInit {
  constructor(private jugadorService: JugadorService,private rutaActiva : ActivatedRoute, private router: Router) { }

  fechaCorta: string = 'dd/MM/yyyy';
  detalleJugador  = <DetalleJugadorDto> {}
  editarJugador = <EditarJugador> {}
  fechaActual : Date = new Date();
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  loading :boolean = true
  id : number = 0;
  home : MenuItem = {}
  items : MenuItem[] = []

  ngOnInit(): void {
    this.cargarItems();
    this.id = this.rutaActiva.snapshot.params.id;
    this.obtenerDetalleJugador(this.id);
  }
  
  cargarItems(): void {
    this.items = [
      {label: 'Jugadores', routerLink:'/jugadores/lista'},
      {label: 'Detalle', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

  obtenerDetalleJugador(id: number) {
    this.jugadorService
      .detalleJugador(id).toPromise().then(
        (data) => {
          this.detalleJugador = data
          this.detalleJugador.historialClubes.forEach(pase =>{
            pase.fechaParsed = new Date(pase.fechaParsed);
            pase.fechaDesdeParsed = new Date(pase.fechaDesdeParsed);
            if(pase.fechaHastaParsed != null){
              pase.fechaHastaParsed =new Date(pase.fechaHastaParsed);
            }
          })
          this.detalleJugador.jugador.fechaNacimientoParsed = new Date(this.detalleJugador.jugador.fechaNacimientoParsed);
          this.loading = false;
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
          this.router.navigate(["/jugadores/lista"]);
        }
      );
  }

  actualizarJugador(){
    this.editarJugador.nombres = this.detalleJugador.jugador.nombre;
    this.editarJugador.apellidos = this.detalleJugador.jugador.apellidos;
    this.editarJugador.documento = this.detalleJugador.jugador.documento;
    this.editarJugador.fechaNacimiento = this.detalleJugador.jugador.fechaNacimientoParsed.toISOString().split("T")[0];
    console.log(this.editarJugador);
    Swal.fire({
      title: "¿Realmente deseas editar el Jugador?",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Editar',
    }).then((result) =>{
      if(result.isConfirmed){
        this.solicitarActualizacionJugador()
      }
    })
  }

  solicitarActualizacionJugador(){
    this.jugadorService.editarJugador(this.id, this.editarJugador).toPromise().then(
      data => {
        this.detalleJugador.jugador = data.datos;
        this.detalleJugador.jugador.fechaNacimientoParsed = new Date(this.detalleJugador.jugador.fechaNacimientoParsed)
        Swal.fire(data.mensaje,'', 'success');
      },err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }
}
