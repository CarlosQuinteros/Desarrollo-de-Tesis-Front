import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenciasRoutingModule } from './competencias-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaCompetenciasComponent } from './componentes/lista/lista-competencias.component';
import { TagModule } from 'primeng/tag';
import { PageListaCompetenciasComponent } from './pages/lista/page-lista-competencias.component';
import { CardModule } from 'primeng/card';
import { NuevaCompetenciaComponent } from './pages/nuevo/nueva-competencia.component';
import {PickListModule} from 'primeng/picklist';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { EditarCompetenciaComponent } from './pages/editar/editar-competencia.component';
import { CalendarioCompetenciaComponent } from './pages/calendario/calendario-competencia.component';
import { TabViewModule } from 'primeng/tabview';
import { DetalleCompetenciaComponent } from './componentes/detalle/detalle-competencia.component';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CrearPartidoComponent } from './componentes/partidos/crear-partido.component';
import { CalendarModule } from 'primeng/calendar';
import { EditarPartidoComponent } from './componentes/partidos/editar/editar-partido.component';


@NgModule({
  declarations: [
    ListaCompetenciasComponent,
    PageListaCompetenciasComponent,
    NuevaCompetenciaComponent,
    EditarCompetenciaComponent,
    CalendarioCompetenciaComponent,
    DetalleCompetenciaComponent,
    CrearPartidoComponent,
    EditarPartidoComponent
  ],
  imports: [
    CommonModule,
    CompetenciasRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    BreadcrumbModule,
    MessageModule,
    MessagesModule,
    TagModule,
    CardModule,
    PickListModule,   
    MultiSelectModule,
    ListboxModule,
    DropdownModule,
    TabViewModule,
    ChipModule,
    RippleModule,
    ToastModule,
    DynamicDialogModule,
    CalendarModule,
    SharedModule
  ]
})
export class CompetenciasModule { }
