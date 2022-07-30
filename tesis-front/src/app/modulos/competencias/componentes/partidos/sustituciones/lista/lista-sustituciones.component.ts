import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Club } from 'src/app/core/modelo/club';
import { Partido } from 'src/app/core/modelo/partido';
import { Sustitucion } from 'src/app/core/modelo/sustitucion';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { SustitucionService } from 'src/app/servicios/sustitucion.service';
import Swal from 'sweetalert2';
import { CrearSustitucionComponent } from '../crear/crear-sustitucion.component';

@Component({
  selector: 'app-lista-sustituciones',
  templateUrl: './lista-sustituciones.component.html',
  styleUrls: ['./lista-sustituciones.component.css'],
  providers: [DialogService]
})
export class ListaSustitucionesComponent implements OnInit {

  @Input() partido! : Partido
  @Input() club : Club = new Club('','','');
  sustituciones : Sustitucion[] = [];
  loading : boolean = true;
  ref! : DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private partidoService : PartidosService,
    private sustitucionService : SustitucionService
  ) { }

  ngOnInit(): void {
    this.obtenerSustitucionesSegunClub();
  }

  obtenerSustitucionesSegunClub(): void {
    if(this.club.id === this.partido.clubLocal.id){
      this.obtenerSustitucionesClubLocal();
      //console.log(`club local id: ${this.club.id}`);
      
    }
    if(this.club.id === this.partido.clubVisitante.id){
      this.obtenerSustitucionesClubVisitante();
      //console.log(`club visitante id: ${this.club.id}`);

    }
  }

  obtenerSustitucionesClubLocal(): void {
    this.partidoService.sustitucionesDelClubLocal(this.partido.id).toPromise().then(
      data => {
        this.sustituciones = data;
        this.loading = false;
      }
    )
  }

  obtenerSustitucionesClubVisitante(): void {
    this.partidoService.sustitucionesDelClubVisitante(this.partido.id).toPromise().then(
      data => {
        this.sustituciones = data;
        this.loading = false;
      }
    )
  }

  showCrearSustitucion(): void {
    this.ref = this.dialogService.open(CrearSustitucionComponent,  {
      header:'Crear sustitucion',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        partido : this.partido,
        club : this.club
      }
    })

    this.ref.onClose.subscribe(() => {
      this.obtenerSustitucionesSegunClub()})
  }

  eliminarSustitucion(sustitucion : Sustitucion):void{
    Swal.fire({
      icon: 'question',
      title: '¿Eliminar la sustitucion?',
      text: 'No se eliminará si el jugador que entro anotó un gol',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.solicitarEliminacion(sustitucion.id);
      }
    })
  }

  solicitarEliminacion(id : number): void {
    this.sustitucionService.eliminarSustitucion(id).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.obtenerSustitucionesSegunClub();
      },
      err => {
        Swal.fire('Error',err.error.message, 'error');
      }
    )
  }

}
