import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { Jornada } from 'src/app/core/modelo/jornada';
import { Jornadas } from 'src/app/core/Dtos/fixture/jornadas';

import { Log } from 'src/app/core/modelo/log';
import { CompetenciasService } from 'src/app/servicios/competencias.service';
import { FechaDesdeHastaService } from 'src/app/servicios/fecha-desde-hasta.service';
import { JornadasService } from 'src/app/servicios/jornadas.service';
import { LogAccionService } from 'src/app/servicios/log-accion.service';
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

  calendario : Jornadas[] = [];

  constructor(
    private logsService: LogService, 
    private router: Router,
    private logAccionService : LogAccionService
    ) { }

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
    this.acciones = this.logAccionService.getAccionesLog();   
  }

  detalleUsuario(id: number): void {
    this.router.navigate([`/usuarios/detalle/${id}`]);
  }

}
