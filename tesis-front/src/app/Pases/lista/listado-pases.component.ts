import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Pase } from 'src/app/modelo/pase';
import { JugadorService } from 'src/app/servicios/jugador.service';
import PasesService from 'src/app/servicios/pases.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado-pases',
  templateUrl: './listado-pases.component.html',
  styleUrls: ['./listado-pases.component.css']
})
export class ListadoPasesComponent implements OnInit {

  loading : boolean = true
  pases : Pase[] = []
  fechaCorta : string = 'dd/MM/yyyy';
  documentoJug : string = '';
  displayModal : boolean = false
  headerModal : string = "Ingrese el Documento del Jugador";

  constructor(private router: Router, private pasesJugService: PasesService, private jugadorService: JugadorService) { }

  ngOnInit(): void {
    this.cargarListadoPases();
  }

  cargarListadoPases(): void {
    this.pasesJugService.listaPases().toPromise().then(
      data => {
        this.pases = data;
        this.pases.forEach(pase => {
          pase.fechaParsed = new Date(pase.fechaParsed);
          pase.fechaDesdeParsed = new Date(pase.fechaDesdeParsed);
          (pase.fechaHastaParsed != null)? pase.fechaHastaParsed = new Date(pase.fechaHastaParsed) : null;
        })
        this.loading = false;
      },
      err=>{
        console.log(err.error.message);
        
      }
    )
  }

  clear(table : Table) {
    table.clear();
  }

  showModalDialog() {
    this.displayModal = true;
}

obtenerJugador(form : NgForm){
  this.displayModal = false;
  this.jugadorService.detalleJugadorPorDni(this.documentoJug).toPromise().then(
    data => {
      //console.log(data.jugador.id);
      this.router.navigate([`jugadores/pases/nuevo/${data.jugador.id}`]);
      
    }, err => {
      Swal.fire('Error', err.error.message, 'error').then((result) => {
        if (result.isConfirmed){
          form.resetForm();
          this.displayModal = true;
        }
      });
    }
  )

}

}
