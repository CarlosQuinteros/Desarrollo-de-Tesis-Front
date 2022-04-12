import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Club } from 'src/app/core/modelo/club';
import { ClubService } from 'src/app/servicios/club.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-clubes',
  templateUrl: './lista-clubes.component.html',
  styleUrls: ['./lista-clubes.component.css']
})
export class ListaClubesComponent implements OnInit {

  clubes : Club[] = [];
  clubesFiltrados : Club[] = [];
  msj : string = '';
  loading : boolean = true
  isAdmin : boolean = false;
  isEncargadoJugadores : boolean = false;
  cols : any[] = [];
  exportColumns : any[] = [];
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(
    private router : Router,
    private clubService : ClubService,
    private tokenService : TokenService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoJugadores = this.tokenService.isEncargadoJugadores();
    this.cargarItems();
    this.cargarClubes();
  }

  cargarItems(): void {
    this.items = [
      {label: 'Clubes'},
      {label: 'Listado', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'}
  }

  cargarClubes():void {
    this.clubService.listaClubes().subscribe(
      data => { 
        this.clubes = data;
        this.clubesFiltrados = data;
        this.loading = false;
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
        this.cargarClubes();
      },
      err => {
        this.msj = err.error.message;
        Swal.fire('Error',this.msj, 'error');
      })
  }

  clear(table : Table) {
    table.clear();
    this.clubesFiltrados = this.clubes;

    
  }

  exportarPdf(table : Table){
    /**this.obtenerClubesFiltrados(table);
    this.generarColumnas();
    console.log(this.clubesFiltrados);
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          var doc : any = new jsPDF.default('p','pt');
          doc.autoTable(this.exportColumns, this.clubesFiltrados);
          doc.save('Clubes.pdf');
      })
    }) */
  }

  exportarExcel(table: Table){
    this.obtenerClubesFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerClubesFiltrados(table: Table): void {
    this.clubesFiltrados = table.filteredValue != null ? table.filteredValue : this.clubes;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  generarColumnas(): void {
    this.cols = [
      {field: "id", header: "ID"},
      {field: "nombreClub", header:"Nombre Club"},
      {field: "alias", header:"Alias"},
      {field: "email", header:"Email"}
    ]

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

}
