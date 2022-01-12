import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Usuario } from 'src/app/modelo/usuario';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios : Usuario[] = [];
  msj : string = '';
  loading : boolean = true;
  usuariosFiltrados: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {

    this.cargarListado();

  }

  cargarListado():void {
    this.usuarioService.listaUsuarios().toPromise().then(
      data => {
        this.usuarios = data;
        this.loading = false;  

        this.usuarios.forEach(usuario => {usuario.fechaCreacion = new Date(usuario.fechaCreacion)});
        
      },
      err => {
        console.log(err);
        
      }
    )
  }

  darDeAltaUsuario(id: number):void {
    /* alerta de confirmacion */
    Swal.fire({
      title: '¿Realmente quieres dar de alta este usuario?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: `Dar alta`,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarAltaUsuario(id);     
      }
      
    })
  }

  solicitarAltaUsuario(id: number):void {
    /*solicito el alta al backend */
    this.usuarioService.darDeAltaUsuario(id).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire('Usuario Activo', this.msj, 'success');
        this.cargarListado();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de alta', this.msj, 'error')

      })
  }

  darDeBajaUsuario(id: number): void {
    /* alerta de confirmacion */
    Swal.fire({
      title: '¿Realmente quieres dar de baja este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Dar baja`,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.solicitarBajaUsuario(id);
      }
      
    })
  }

  solicitarBajaUsuario(id: number): void {

    /*solicito baja al backend */
    this.usuarioService.darDeBajaUsuario(id).subscribe(
      (data) => {
        this.msj = data.mensaje;
        Swal.fire('Usuario Inactivo', this.msj, 'success');
        this.cargarListado();
      }, 
      (err) => {
        this.msj = err.error.mensaje;
        Swal.fire('Error al dar de baja', this.msj, 'error')

      })

  }

  clear(table : Table){
    table.clear();
  }

  exportarPdf(table : Table){
    this.obtenerUsuariosFiltrados(table);
    this.usuariosFiltrados = this.usuarios;
    this.obtenerFiltros(table);

  }

  exportarExcel(table: Table){
    this.obtenerUsuariosFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerUsuariosFiltrados(table: Table): void {
    this.usuariosFiltrados = table.filteredValue != null ? table.filteredValue : this.usuarios;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
    
    

  }

}
