import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { Log } from 'src/app/modelo/log';
import { FechaDesdeHastaService } from 'src/app/servicios/fecha-desde-hasta.service';
import { LogService } from 'src/app/servicios/log.service';

@Component({
  selector: 'app-lista-logs',
  templateUrl: './lista-logs.component.html',
  styleUrls: ['./lista-logs.component.css']
})
export class ListaLogsComponent implements OnInit {


  loading = true;
  logs : Log[] = [];
  acciones: any = [];
  home : MenuItem = {}
  items : MenuItem[] = [];


  constructor(private logsService: LogService, private router: Router) { }

  ngOnInit(): void {
    this.cargarLogs();
    this.cargarAcciones();
    this.cargarItems();   
  }

  clear(table : Table){
    table.clear();
  }

  cargarItems():void{
    this.items = [
      {label:'Logs de usuarios'},
      {label:'Listado', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

  cargarLogs(): void{
    this.logsService.listaLogs().subscribe(
      data =>{
        this.logs = data;
        this.loading = false;

        this.logs.forEach(log =>{log.fecha = new Date(log.fecha)})
      }
    )
  }

  cargarAcciones():void{
    this.acciones = [
      {label: 'Usuarios', value:'USUARIO'},
      {label: 'Accesos al sistema', value: 'USUARIO_LOGIN'},
      {label: 'Creacion Usuario', value: 'USUARIO_CREACION'},
      {label: 'Alta Usuario', value: 'USUARIO_ALTA'},
      {label: 'Baja Usuario', value: 'USUARIO_BAJA'},
      {label: 'Error acceso al sistema', value: 'USUARIO_ERROR_LOGIN'},
      {label: 'Intento login usuario inactivo', value: 'USUARIO_ERROR_LOGIN_USUARIO_INACTIVO'},

      {label: 'Clubes', value: 'CLUBES'},
      {label: 'Creacion Club', value: 'CLUBES_CREACION'},
      {label: 'Modificacion Club', value: 'CLUBES_MODIFICACION'},
      {label: 'Eliminacion Club', value: 'CLUBES_ELIMINACION'},

      {label:'Jugadores', value: 'JUGADORES'},
      {label: 'Creacion Jugador', value: 'JUGADORES_CREACION'},
      {label: 'Modificacion Jugador', value: 'JUGADORES_MODIFICACION'},
      {label: 'Alta Jugador', value: 'JUGADORES_ALTA'},
      {label: 'Baja Jugador', value: 'JUGADORES_BAJA'},

      {label:'Pases', value: 'PASES'},
      {label: 'Creacion Pase', value: 'PASES_CREACION'}      
    ]
  }

  detalleUsuario(id: number): void {
    this.router.navigate([`/usuarios/detalle/${id}`]);
  }


}
