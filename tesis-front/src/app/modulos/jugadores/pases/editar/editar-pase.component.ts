import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { EditarPaseJugadorDto } from 'src/app/core/Dtos/jugadores/editar-pase-jugador-dto';
import { Club } from 'src/app/core/modelo/club';
import { EstadoJugador } from 'src/app/core/modelo/estado-jugador';
import { Jugador } from 'src/app/core/modelo/jugador';
import { Pase } from 'src/app/core/modelo/pase';
import { ClubService } from 'src/app/servicios/club.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import PasesService from 'src/app/servicios/pases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pase',
  templateUrl: './editar-pase.component.html',
  styleUrls: ['./editar-pase.component.css']
})
export class EditarPaseComponent implements OnInit {

  idPase: number = 0;
  jugador : Jugador = new Jugador('','','', new EstadoJugador(''));
  paseEditarDto : EditarPaseJugadorDto = new EditarPaseJugadorDto(0, 0, new Date(), null, '');
  paseJugadorObtenido = <Pase>{};
  items : MenuItem[] = [];
  home : MenuItem = {};

  clubes : Club[] = [];

  constructor(
    private location : Location,
    private jugadorService: JugadorService,
    private paseJugadorService: PasesService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idPase = this.route.snapshot.params.id;    
   }

  ngOnInit(): void {
    this.obtenerDetallePase();
    this.obtenerClubes();
    this.cargarItems();
  }

  cargarItems(): void {
    this.items = [
      {label:'Jugadores', routerLink:'/jugadores/lista'},
      {label:'Historial', routerLink:`/jugadores/historialClubes/${this.jugador.id}`},
      {label:'Editar pase', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
  }

  goBack(): void {
    this.location.back();
  }

  obtenerDetallePase(): void {
    this.paseJugadorService.detallePase(this.idPase).toPromise().then(
      data => {
        this.paseEditarDto.idJugador = data.jugador.id!;
        this.paseEditarDto.idClub = data.club.id;
        this.paseEditarDto.fechaDesde = new Date(data.fechaDesdeParsed);
        this.paseEditarDto.fechaHasta = data.fechaHastaParsed != null ? new Date(data.fechaHastaParsed) : null;
        this.paseEditarDto.motivo = data.motivo;
        this.jugador = data.jugador;
        this.jugador.fechaNacimientoParsed = new Date(data.jugador.fechaNacimientoParsed);
        this.paseJugadorObtenido = data;
        console.log(this.paseJugadorObtenido);
      }
    )
  }

  obtenerClubes(): void {
    this.clubService.listaClubes().toPromise().then(
      data => {
        this.clubes = data;
      }
    )
  }

  formatearTextoSwal():string{
    let texto : string = '';
    if (this.paseJugadorObtenido.fechaHastaParsed == null && this.jugador.clubActual.id != this.paseEditarDto.idClub){
      texto = 'Se actualizará el club actual del jugador';
    } 
    if(this.paseJugadorObtenido.fechaHastaParsed == null && this.paseEditarDto.fechaHasta != null){
      texto = 'Se actualizara el pase actual del jugador. El jugador quedará sin club';
    }
    return texto;
  }

  editarPase(form : NgForm) : void{
    console.log(this.paseEditarDto);
    const texto = this.formatearTextoSwal();
    Swal.fire({
      icon: 'question',
      title: 'Realmente deseas editar el pase del jugador',
      text: texto,
      showCancelButton : true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEdicionPase();
      }
    })
  }

  solicitarEdicionPase(): void {
    this.jugadorService.editarPase(this.idPase, this.paseEditarDto).toPromise().then(
      data => {
        Swal.fire(data.mensaje,'Te redireccionamos al historial de clubes del jugador', 'success');
        this.router.navigate([`/jugadores/historialClubes/${this.jugador.id}`]);
      },
      err => {
        Swal.fire('Error','La operacion no se realizo con exito', 'error');
      }
    )
  }

}
