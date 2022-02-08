import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { ListadoPasesComponent } from './lista/listado-pases.component';

const ADMIN = 'ROLE_ADMIN';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES'

const routes: Routes = [
  {
    path: '',
    children:[
      {path: 'lista', component:ListadoPasesComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path:'**', redirectTo:'lista'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasesRoutingModule { }
