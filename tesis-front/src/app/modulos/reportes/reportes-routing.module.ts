import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteDeActividadComponent } from './usuarios/reporte-de-actividad.component';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { Roles } from 'src/app/core/enum/roles';

const ADMIN = Roles.ADMIN;

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'usuarios/actividad' },
      {
        path: 'usuarios/actividad',
        component: ReporteDeActividadComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN] },
      },
      { path: '**', redirectTo: 'usuarios/actividad' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
