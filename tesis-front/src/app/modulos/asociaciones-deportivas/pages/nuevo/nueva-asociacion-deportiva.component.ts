import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AsociacionDeportivaDto } from 'src/app/core/Dtos/asociaciones-deportivas/asociacion-deportiva-dto';
import { AsociacionDeportivaService } from 'src/app/servicios/asociacion-deportiva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-asociacion-deportiva',
  templateUrl: './nueva-asociacion-deportiva.component.html',
  styleUrls: ['./nueva-asociacion-deportiva.component.css']
})
export class NuevaAsociacionDeportivaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  asociacionDeportivaDto : AsociacionDeportivaDto = new AsociacionDeportivaDto('','','');

  constructor(
    private asociacionDeportivaService : AsociacionDeportivaService,
    private router : Router,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items = [
      {label:'Asociaciones Deportivas', routerLink:'/asociaciones-deportivas/lista'},
      {label:'Nueva', disabled:true}
    ];
  }

  goBack(): void {
    this.location.back();
  }

  crearNuevaAsociacion(): void {
    // console.log(this.asociacionDeportivaDto);    
    Swal.fire(
      {
        title: '¿Crear una nueva Asociacion?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar'
      }
    ).then(result=> {
      if(result.isConfirmed){
        this.solicitarCreacionNuevaAsociacion();
      }
    })
  }

  solicitarCreacionNuevaAsociacion(): void {
    this.asociacionDeportivaService.crearAsociacion(this.asociacionDeportivaDto).subscribe(
      data =>{
        Swal.fire(data.mensaje, 'Te redireccionamos al listado', 'success');
        this.router.navigate(['/asociaciones-deportivas/lista'])
      },
      err =>{
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

}
