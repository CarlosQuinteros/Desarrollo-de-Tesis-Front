import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Log } from 'src/app/core/modelo/log';
import { ChartServiceService } from 'src/app/servicios/chart-service.service';
import { FechaDesdeHastaService } from 'src/app/servicios/fecha-desde-hasta.service';
import { LogService } from 'src/app/servicios/log.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-reporte-de-actividad',
  templateUrl: './reporte-de-actividad.component.html',
  styleUrls: ['./reporte-de-actividad.component.css']
})
export class ReporteDeActividadComponent implements OnInit {

  items : MenuItem[] = [];
  home : MenuItem = {}


  
  constructor(
    private logService: LogService, 
    private chartService: ChartServiceService,
    private fechaService: FechaDesdeHastaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.items = [
      {label: 'Reportes'},
      {label: 'Usuarios'},
      {label: 'Actividad', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/inicio'};
  }

}
