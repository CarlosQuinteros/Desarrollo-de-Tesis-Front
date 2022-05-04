import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enum/roles';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { ListaLogsComponent } from './lista/lista-logs.component';

const ADMIN = Roles.ADMIN;

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo:'lista'},
      {
        path: 'lista',
        component: ListaLogsComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN] },
      },
      { path: '**', redirectTo: 'lista' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
