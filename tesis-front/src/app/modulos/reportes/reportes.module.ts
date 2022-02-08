import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { ReporteDeActividadComponent } from './usuarios/reporte-de-actividad.component';
import { ActividadPorUsuarioComponent } from './usuarios/actividadPorUsuario/actividad-por-usuario.component';
import { UsuariosMasActivosComponent } from './usuarios/usuariosMasActivos/usuarios-mas-activos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReporteDeActividadComponent,
    ActividadPorUsuarioComponent,
    UsuariosMasActivosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReportesRoutingModule,
    TableModule,
    MessageModule,
    CardModule,
    CalendarModule,
    BreadcrumbModule,
    SharedModule,
    ChartModule,
    InputNumberModule,
    ScrollTopModule,
    DropdownModule
  ]
})
export class ReportesModule { }
