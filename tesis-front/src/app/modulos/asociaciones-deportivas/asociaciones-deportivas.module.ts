import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsociacionesDeportivasRoutingModule } from './asociaciones-deportivas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { ListaAsociacionesDeportivasComponent } from './componentes/lista/lista-asociaciones-deportivas.component';
import { CardModule } from 'primeng/card';
import { PageListaAsociacionesDeportivasComponent } from './pages/lista/page-lista-asociaciones-deportivas.component';
import { NuevaAsociacionDeportivaComponent } from './pages/nuevo/nueva-asociacion-deportiva.component';
import { EditarAsociacionDeportivaComponent } from './pages/editar/editar-asociacion-deportiva.component';


@NgModule({
  declarations: [
    ListaAsociacionesDeportivasComponent,
    PageListaAsociacionesDeportivasComponent,
    NuevaAsociacionDeportivaComponent,
    EditarAsociacionDeportivaComponent
  ],
  imports: [
    CommonModule,
    AsociacionesDeportivasRoutingModule,
    SharedModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    ButtonModule,
    ScrollTopModule,
    BreadcrumbModule,
    RouterModule,
    CardModule
  ]
})
export class AsociacionesDeportivasModule { }
