import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { NuevoJuezDto } from 'src/app/core/Dtos/jueces/nuevo-juez-dto';
import { JuezService } from 'src/app/servicios/juez.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-juez',
  templateUrl: './editar-juez.component.html',
  styleUrls: ['./editar-juez.component.css']
})
export class EditarJuezComponent implements OnInit {

  items: MenuItem[] = [];
  home : MenuItem = {}
  editarJuezDto : NuevoJuezDto = new NuevoJuezDto('','','','');
  idJuez : number = 0;
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  blockSpace: RegExp = /[^\s]/;

  constructor(
    private juezService: JuezService,
    private location : Location,
    private router : Router, 
    private rutaActiva : ActivatedRoute
  ) { 
    this.idJuez = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarJuez();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
    this.items = [
      {label:'Jueces', routerLink:'/jueces/lista'},
      {label:'Detalle', disabled:true}
    ]
  }

  cargarJuez(): void {
    this.juezService.detalleJuezPorId(this.idJuez).toPromise().then(
      data => {
        this.editarJuezDto.apellidos = data.apellidos;
        this.editarJuezDto.nombres = data.nombres;
        this.editarJuezDto.documento = data.documento;
        this.editarJuezDto.legajo = data.legajo;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      })
  }

  editarJuez(form: NgForm): void {
    Swal.fire(
      {
        title: '¿Realmente deseas editar el juez?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }
    ).then(result =>{
      if(result.isConfirmed){
        this.solicitarModificacionJuez(form);
      }
    })
  }

  solicitarModificacionJuez(form: NgForm){
    this.juezService.editarJuez(this.idJuez, this.editarJuezDto).subscribe(
      data =>{
        form.resetForm();
        Swal.fire('Juez editado correctamente', 'Te redireccionamos al listado', 'success');
        this.router.navigate(['jueces/lista']);
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    )
  }

  goBack() {
    this.location.back();
  }

}
