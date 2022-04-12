import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugadoresRoutingModule } from './jugadores-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ChipModule } from 'primeng/chip';
import { NuevoJugadorComponent } from './nuevo/nuevo-jugador.component';
import { ListadoJugadoresComponent } from './lista/listado-jugadores.component';
import { DetalleJugadorComponent } from './detalle/detalle-jugador.component';
import { ListadoPasesJugadorComponent } from './pases/lista/listado-pases-jugador.component';
import { NuevoPaseJugadorComponent } from './pases/nuevo/nuevo-pase-jugador.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollTopModule } from 'primeng/scrolltop';
import {TagModule } from 'primeng/tag';
import { EditarPaseComponent } from './pases/editar/editar-pase.component';


@NgModule({
  declarations: [
    NuevoJugadorComponent,
    ListadoJugadoresComponent,
    DetalleJugadorComponent,
    ListadoPasesJugadorComponent,
    NuevoPaseJugadorComponent,
    EditarPaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    JugadoresRoutingModule,
    SharedModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    KeyFilterModule,
    ChipModule,
    ScrollTopModule,
    TagModule
  ]
})
export class JugadoresModule { }
