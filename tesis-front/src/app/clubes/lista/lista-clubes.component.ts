import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/modelo/club';
import { ClubService } from 'src/app/servicios/club.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clubes',
  templateUrl: './lista-clubes.component.html',
  styleUrls: ['./lista-clubes.component.css']
})
export class ListaClubesComponent implements OnInit {

  clubes : Club[] = [];
  msj : string = '';

  constructor(
    private router : Router,
    private clubService : ClubService
  ) { }

  ngOnInit(): void {
    this.cargarClubes();
  }

  cargarClubes():void {
    this.clubService.listaClubes().subscribe(
      data => {
        this.clubes = data;
      }
    )
  }

  eliminarClub(id: number):void {
    Swal.fire({
      title: '¿Realmente deseas eliminar el Club?',
      text: 'No se eliminará si contiene referencias con jugadores',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarEliminacion(id);
      }
    })
  }

  solicitarEliminacion(id: number):void {
    this.clubService.eliminarClub(id).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire(this.msj,'', 'success');
        this.cargarClubes
      },
      err => {
        this.msj = err.error.message;
        Swal.fire('Error',this.msj, 'error');
      })
  }

}
