import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { NuevoJuezDto } from 'src/app/core/Dtos/jueces/nuevo-juez-dto';
import { JuezService } from 'src/app/servicios/juez.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-juez',
  templateUrl: './nuevo-juez.component.html',
  styleUrls: ['./nuevo-juez.component.css']
})
export class NuevoJuezComponent implements OnInit {

  items : MenuItem[] = [];
  home : MenuItem = {}
  nuevoJuezDto : NuevoJuezDto = new NuevoJuezDto('','','','');
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  blockSpace: RegExp = /[^\s]/;


  constructor(
    private juezService : JuezService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
    this.items = [
      {label: 'Jueces', routerLink:'/jueces/lista'},
      {label: 'Nuevo', disabled:true}
    ]
  }

  crearNuevoJuez(form : NgForm): void {
    //console.log(this.nuevoJuezDto);
    Swal.fire({
      title: '¿Crear un nuevo Juez?',
      icon:'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarCreacionNuevoJuez(form);
      }
    })
  }

  solicitarCreacionNuevoJuez(form: NgForm):void{
    this.juezService.crearJuez(this.nuevoJuezDto).toPromise().then(
      data => {
        Swal.fire(data.mensaje, '', 'success');
        form.resetForm();
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

}
