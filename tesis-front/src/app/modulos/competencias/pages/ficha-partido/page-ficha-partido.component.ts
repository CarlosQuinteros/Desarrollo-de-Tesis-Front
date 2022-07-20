import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleGeneralPartidoDto } from 'src/app/core/Dtos/partidos/detalle-general-partido-dto';
import { JuezRol } from 'src/app/core/modelo/juez-rol';
import { Partido } from 'src/app/core/modelo/partido';
import { JuezRolPartidoService } from 'src/app/servicios/juez-rol-partido.service';
import { PartidosService } from 'src/app/servicios/partidos.service';
import Swal from 'sweetalert2';
import { CrearParticipacionJuezComponent } from '../../componentes/partidos/participacion-jueces/crear/crear-participacion-juez.component';
import { EditarParticipacionJuezComponent } from '../../componentes/partidos/participacion-jueces/editar/editar-participacion-juez.component';

@Component({
  selector: 'app-page-ficha-partido',
  templateUrl: './page-ficha-partido.component.html',
  styleUrls: ['./page-ficha-partido.component.css'],
  providers: [DialogService]
})
export class PageFichaPartidoComponent implements OnInit, OnDestroy{

  idPartido : number = 0;
  partido! : DetalleGeneralPartidoDto;
  detallePartido! : Partido;
  home : MenuItem = {}
  items : MenuItem[] = [];
  jueces : JuezRol[] = [];
  loadingJueces: boolean = true;
  ref! : DynamicDialogRef;
  
  constructor(
    private router: Router,
    private rutaActiva : ActivatedRoute,
    private partidoService : PartidosService,
    private juezRolPartidoService : JuezRolPartidoService,
    private location : Location,
    public dialogService : DialogService
  ) { }

  ngOnInit(): void {
    this.idPartido = this.rutaActiva.snapshot.params.idPartido;
    this.obtenerDetalleGeneralPartido();
    this.obtenerPartido();
    this.cargarItems();
    this.obtenerParticipacionJueces();
  }

  obtenerDetalleGeneralPartido(): void {
    this.partidoService.detalleDatosGeneralesPartido(this.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
        this.goBack();
      }
    )
  }

  obtenerPartido(): void {
    this.partidoService.detallePartido(this.idPartido).subscribe(
      data => {
        this.detallePartido = data;
      }
    )
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label: 'Partido'},
      {label: 'Ficha', disabled: true},
    ];
  }

  goBack(): void {
    this.location.back();
  }

  /*********** Jueces *********/
  obtenerParticipacionJueces(): void {
    this.partidoService.juecesDePartido(this.idPartido).subscribe(
      data => {
        this.jueces = data;
        this.loadingJueces = false;
      }
    )
  }

  showEdicionParticipacion(participacion : JuezRol): void {
    this.ref = this.dialogService.open(EditarParticipacionJuezComponent, {
      header:'Editar Participacion',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        participacionJuez : {...participacion}
      }
    })
    this.ref.onClose.subscribe(() => {
      this.obtenerParticipacionJueces();
    })
  }

  showNuevaParticipacionJuez():void{
    this.ref = this.dialogService.open(CrearParticipacionJuezComponent ,{
      header:'Crear Participacion Juez',
      contentStyle: {"overflow": "auto", "max-width": "500px"},
      data:{
        idPartido: this.idPartido
      }
    })

    this.ref.onClose.subscribe(() => {
      this.obtenerParticipacionJueces();
    })
  }

  eliminarPaticipacionJuez(id: number): void {
    Swal.fire({
      icon:'question',
      title: "¿Eliminar participacion del juez?",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEliminacionParticipacionJuez(id);
      }
    })    
  }


  solicitarEliminacionParticipacionJuez(id: number): void {
    this.juezRolPartidoService.eliminarParticipacionJuez(id).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        this.obtenerParticipacionJueces();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
      
    )
  }

  /************ finalizacion partido**** */
  finalizarPartido(): void {
    Swal.fire({
      icon: 'question',
      title: '¿Finalizar el partido?',
      text:'Se cambiara el estdo de PENDIENTE a FINALIZADO y no se permitirá editarlo',
      showCancelButton:true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText:'Finalizar'
    }).then((result)=>{
      if(result.isConfirmed){
        
      }
    })
  }

  ngOnDestroy(): void {
      if(this.ref){
        this.ref.close();
      }
  }


}
