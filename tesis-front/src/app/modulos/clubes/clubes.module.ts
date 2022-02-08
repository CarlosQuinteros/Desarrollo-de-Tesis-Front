import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubesRoutingModule } from './clubes-routing.module';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ListaClubesComponent } from 'src/app/modulos/clubes/lista/lista-clubes.component';
import { EditarClubComponent } from 'src/app/modulos/clubes/editar/editar-club.component';
import { NuevoClubComponent } from 'src/app/modulos/clubes/nuevo/nuevo-club.component';
import { ListaJugadoresActualesComponent } from 'src/app/modulos/clubes/listaJugadoresActuales/lista-jugadores-actuales.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListaClubesComponent,
    EditarClubComponent,
    NuevoClubComponent,
    ListaJugadoresActualesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClubesRoutingModule,
    MessageModule,
    TableModule,
    RouterModule,
    ButtonModule,
    BreadcrumbModule,
    SharedModule
  ]
})
export class ClubesModule { }
