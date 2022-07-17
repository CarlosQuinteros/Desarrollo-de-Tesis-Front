import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListaCompetenciasComponent } from './pages/lista/page-lista-competencias.component';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { Roles } from 'src/app/core/enum/roles';
import { NuevaCompetenciaComponent } from './pages/nuevo/nueva-competencia.component';
import { EditarCompetenciaComponent } from './pages/editar/editar-competencia.component';
import { CalendarioCompetenciaComponent } from './pages/calendario/calendario-competencia.component';
import { CrearPartidoComponent } from './componentes/partidos/crear-partido.component';
import { EditarPartidoComponent } from './componentes/partidos/editar/editar-partido.component';

const ADMIN = Roles.ADMIN;
const ENCARGADO_DE_TORNEOS = Roles.ENCARGADO_DE_TORNEOS;

const routes: Routes = [
  {
    path: '',
    canActivate: [guardUsuarios],
    data: { rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]},
    children: [
      { path: '', redirectTo: 'lista'},
      {
        path: 'lista',
        component : PageListaCompetenciasComponent
      },
      {
        path: 'nuevo',
        component: NuevaCompetenciaComponent
      },
      {
        path: 'editar/:id',
        component: EditarCompetenciaComponent
      },
      {
        path: ':id/calendario',
        component: CalendarioCompetenciaComponent
      },
      {
        path: ':idCompetencia/calendario/jornada/:idJornada/partidos',
        component: CrearPartidoComponent
      },
      {
        path: 'partido/:idPartido/editar',
        component: EditarPartidoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenciasRoutingModule { }
