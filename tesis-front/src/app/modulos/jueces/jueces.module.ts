import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuecesRoutingModule } from './jueces-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaJuecesComponent } from './componentes/lista/lista-jueces.component';
import { TableModule } from 'primeng/table';
import { ListadoJuecesComponent } from './paginas/lista/listado-jueces.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NuevoJuezComponent } from './paginas/nuevo/nuevo-juez.component';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { KeyFilterModule } from 'primeng/keyfilter';
import { EditarJuezComponent } from './paginas/editar/editar-juez.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    ListaJuecesComponent,
    ListadoJuecesComponent,
    NuevoJuezComponent,
    EditarJuezComponent
  ],
  imports: [
    CommonModule,
    JuecesRoutingModule,
    SharedModule,
    TableModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ButtonModule,
    ScrollTopModule,
    BreadcrumbModule,
    RouterModule,
    KeyFilterModule,
    CardModule
  ]
})
export class JuecesModule { }
