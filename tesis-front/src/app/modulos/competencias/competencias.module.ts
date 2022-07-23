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
import {CarouselModule} from 'primeng/carousel';
import { PageFichaPartidoComponent } from './pages/ficha-partido/page-ficha-partido.component';
import { EncabezadoPartidoComponent } from './componentes/partidos/portada-ficha-partido/encabezado-partido.component';
import {AccordionModule} from 'primeng/accordion';
import { CrearParticipacionJuezComponent } from './componentes/partidos/participacion-jueces/crear/crear-participacion-juez.component';
import { EditarParticipacionJuezComponent } from './componentes/partidos/participacion-jueces/editar/editar-participacion-juez.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListaJugadoresTitularesComponent } from './componentes/partidos/participacion-jugadores/titulares/lista/lista-jugadores-titulares.component';
import { CrearTitularComponent } from './componentes/partidos/participacion-jugadores/titulares/crear/crear-titular.component';
import { CrearSuplenteComponent } from './componentes/partidos/participacion-jugadores/suplentes/crear/crear-suplente.component';
import { ListaJugadoresSuplentesComponent } from './componentes/partidos/participacion-jugadores/suplentes/lista/lista-jugadores-suplentes.component';
import { EditarSuplenteComponent } from './componentes/partidos/participacion-jugadores/suplentes/editar/editar-suplente.component';
import { EditarTitularComponent } from './componentes/partidos/participacion-jugadores/titulares/editar/editar-titular.component';
import { ListaSustitucionesComponent } from './componentes/partidos/sustituciones/lista/lista-sustituciones.component';
import { CrearSustitucionComponent } from './componentes/partidos/sustituciones/crear/crear-sustitucion.component';


@NgModule({
  declarations: [
    ListaCompetenciasComponent,
    PageListaCompetenciasComponent,
    NuevaCompetenciaComponent,
    EditarCompetenciaComponent,
    CalendarioCompetenciaComponent,
    DetalleCompetenciaComponent,
    CrearPartidoComponent,
    EditarPartidoComponent,
    PageFichaPartidoComponent,
    EncabezadoPartidoComponent,
    CrearParticipacionJuezComponent,
    EditarParticipacionJuezComponent,
    ListaJugadoresTitularesComponent,
    ListaJugadoresSuplentesComponent,
    CrearTitularComponent,
    CrearSuplenteComponent,
    EditarSuplenteComponent,
    EditarTitularComponent,
    ListaSustitucionesComponent,
    CrearSustitucionComponent
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
    CarouselModule,
    AccordionModule,
    KeyFilterModule,
    SharedModule
  ],
  entryComponents:[
    CrearParticipacionJuezComponent,
    EditarParticipacionJuezComponent,
    CrearTitularComponent,
    CrearSuplenteComponent,
    EditarTitularComponent,
    EditarSuplenteComponent,
    CrearSustitucionComponent
  ]
})
export class CompetenciasModule { }
