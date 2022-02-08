import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService as guardUsuarios} from 'src/app/core/guards/usuario-guard.service';
import { DetalleJugadorComponent } from 'src/app/modulos/jugadores/detalle/detalle-jugador.component';
import { ListadoJugadoresComponent } from './lista/listado-jugadores.component';
import { NuevoJugadorComponent } from './nuevo/nuevo-jugador.component';
import { ListadoPasesJugadorComponent } from './pases/lista/listado-pases-jugador.component';
import { NuevoPaseJugadorComponent } from './pases/nuevo/nuevo-pase-jugador.component';

const ADMIN = 'ROLE_ADMIN';
const USER = 'ROLE_USER';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'', redirectTo:'nuevo'},
      {path: 'nuevo',component:NuevoJugadorComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path: 'detalle/:id', component:DetalleJugadorComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path: 'lista', component:ListadoJugadoresComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES, USER]}},
      {path: 'historialClubes/:id', component:ListadoPasesJugadorComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path: 'pases/nuevo/:id', component:NuevoPaseJugadorComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[ADMIN, ENCARGADO_DE_JUGADORES]}},
      {path: '**', redirectTo:'lista'}  

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadoresRoutingModule { }
