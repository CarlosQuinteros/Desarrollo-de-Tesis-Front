import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarClubComponent } from 'src/app/modulos/clubes/editar/editar-club.component';
import { ListaClubesComponent } from 'src/app/modulos/clubes/lista/lista-clubes.component';
import { ListaJugadoresActualesComponent } from 'src/app/modulos/clubes/listaJugadoresActuales/lista-jugadores-actuales.component';
import { NuevoClubComponent } from 'src/app/modulos/clubes/nuevo/nuevo-club.component';
import { UsuarioGuardService as guardUsuarios} from 'src/app/core/guards/usuario-guard.service';

const ADMIN = 'ROLE_ADMIN';
const ENCARGADO_DE_TORNEOS = 'ROLE_ENCARGADO_DE_TORNEOS';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'', redirectTo:'lista'},
      {path: 'lista', component: ListaClubesComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES,ENCARGADO_DE_TORNEOS]}},
      {path: 'nuevo', component: NuevoClubComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN,ENCARGADO_DE_JUGADORES]}},
      {path: 'detalle/:id', component:EditarClubComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path: ':id/jugadores', component:ListaJugadoresActualesComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path:'**', redirectTo:'lista'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubesRoutingModule { }
