import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enum/roles';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { ListadoPasesComponent } from './lista/listado-pases.component';

const ADMIN = Roles.ADMIN;
const ENCARGADO_DE_JUGADORES = Roles.ENCARGADO_DE_JUGADORES;

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lista',
        component: ListadoPasesComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES] },
      },
      { path: '**', redirectTo: 'lista' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasesRoutingModule { }
