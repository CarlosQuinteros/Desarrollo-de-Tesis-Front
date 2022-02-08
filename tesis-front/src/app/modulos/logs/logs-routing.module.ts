import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { ListaLogsComponent } from './lista/lista-logs.component';

const ADMIN = 'ROLE_ADMIN';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: 'lista', component:ListaLogsComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
      {path:'**', redirectTo:'lista'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
