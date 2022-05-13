import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AsociacionDeportivaDto } from 'src/app/core/Dtos/asociaciones-deportivas/asociacion-deportiva-dto';
import { AsociacionDeportivaService } from 'src/app/servicios/asociacion-deportiva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-asociacion-deportiva',
  templateUrl: './editar-asociacion-deportiva.component.html',
  styleUrls: ['./editar-asociacion-deportiva.component.css']
})
export class EditarAsociacionDeportivaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  asociacionDeportivaDto : AsociacionDeportivaDto = new AsociacionDeportivaDto('','','');
  idAsociacion : number = 0;
  constructor(
    private asociacionDeportivaService : AsociacionDeportivaService,
    private router : Router,
    private location : Location,
    private rutaActiva : ActivatedRoute
  ) { 
    this.idAsociacion = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarAsociacion();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items = [
      {label:'Asociaciones Deportivas', routerLink:'/asociaciones-deportivas/lista'},
      {label:'Detalle', disabled:true}
    ];
  }

  goBack(): void {
    this.location.back();
  }

  cargarAsociacion():void {
    this.asociacionDeportivaService.detalleAsociacion(this.idAsociacion).subscribe(
      data => {
        this.asociacionDeportivaDto.nombre = data.nombre;
        this.asociacionDeportivaDto.alias = data.alias;
        this.asociacionDeportivaDto.email = data.email;
      }
    )
  }

  editarAsociacion(): void {
    Swal.fire(
      {
        title: '¿Realmente deseas editar la Asociacion?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }
    ).then(result=> {
      if(result.isConfirmed){
        this.solicitarModificacionAsociacion();
      }
    })
  }

  solicitarModificacionAsociacion() : void {
    this.asociacionDeportivaService.editarAsociacion(this.asociacionDeportivaDto, this.idAsociacion).subscribe(
      data => {
        Swal.fire(data.mensaje, 'Te redireccionamos al listado', 'success');
        this.router.navigate(['/asociaciones-deportivas/lista']);
      },
      err => {
        Swal.fire('Error',err.error.message, 'error');
      }
    )
  }

}
