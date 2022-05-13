import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enum/roles';

import { UsuarioGuardService as guardUsuarios} from 'src/app/core/guards/usuario-guard.service';
import { EditarJuezComponent } from './paginas/editar/editar-juez.component';
import { ListadoJuecesComponent } from './paginas/lista/listado-jueces.component';
import { NuevoJuezComponent } from './paginas/nuevo/nuevo-juez.component';

const ADMIN = Roles.ADMIN;
const ENCARGADO_DE_TORNEOS = Roles.ENCARGADO_DE_TORNEOS;

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'', redirectTo: 'lista'},
      {
        path: 'lista',
        component: ListadoJuecesComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {
        path:'nuevo',
        component: NuevoJuezComponent,
        canActivate: [guardUsuarios],
        data : {rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {
        path: 'detalle/:id',
        component: EditarJuezComponent,
        canActivate: [guardUsuarios],
        data: {rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {path: '**', redirectTo:''}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuecesRoutingModule { }
