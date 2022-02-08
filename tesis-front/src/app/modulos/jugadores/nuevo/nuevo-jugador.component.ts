import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { NuevoJugadorDto } from 'src/app/core/Dtos/jugadores/nuevo-jugador-dto';
import { Club } from 'src/app/core/modelo/club';
import { ClubService } from 'src/app/servicios/club.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-jugador',
  templateUrl: './nuevo-jugador.component.html',
  styleUrls: ['./nuevo-jugador.component.css']
})
export class NuevoJugadorComponent implements OnInit {

  nuevoJugador : NuevoJugadorDto = new NuevoJugadorDto('','', '','','',0);
  fechaNac : Date = new Date();
  clubes : Club[] = [];
  club : Club[] = [];
  id : number = 0
  fechaActual : Date = new Date();
  fechaInsc : Date = new Date();
  clubSelec : Club = new Club('','','');
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  msj : string = '';
  home: MenuItem = {}
  items: MenuItem[] = [];


  constructor(private ClubService: ClubService, private jugadorService: JugadorService) { }

  ngOnInit(): void {
    this.cargarClubes();
    this.cargarItems();

  }

  cargarItems(): void {
    this.items = [
      {label:'Jugadores', routerLink:'/jugadores/lista'},
      {label:'Nuevo', disabled:true}
    ]
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
  }

  cargarClubes(): void {
    this.ClubService.listaClubes().subscribe(
      data =>{
        this.clubes = data;
        this.id = this.clubes[0].id;        
      }
    )
  }

  crearJugador(form : NgForm): void {
    this.nuevoJugador.fechaNacimiento = this.fechaNac.toISOString().split("T")[0];
    this.nuevoJugador.fechaInscripcion = this.fechaInsc.toISOString().split("T")[0];
    let club : Club = this.clubes.filter(c => c.id == this.nuevoJugador.idClub)[0];
    console.log(this.nuevoJugador);

    Swal.fire({
      title: '¿Realmente deseas crear un Jugador nuevo?',
      text:`Se registrará su inscripción para el club "${club.nombreClub}"`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText : 'Cancelar',
      confirmButtonText:'Crear'
    }).then((result=>{
      if(result.isConfirmed){
        this.solicitarCreacionJugador(form);
      }
    }))
    
  }

  solicitarCreacionJugador(form : NgForm):void{
    this.jugadorService.crearJugador(this.nuevoJugador).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire(this.msj,'','success');
        form.resetForm();
        this.fechaNac = this.fechaActual;
        this.fechaInsc = this.fechaActual;
      },
      err => {
        this.msj = err.error.message;
        Swal.fire('Error', this.msj, 'error');
      }
    )

  }

}
