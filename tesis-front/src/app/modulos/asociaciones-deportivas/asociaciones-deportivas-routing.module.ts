import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enum/roles';
import { ListaAsociacionesDeportivasComponent } from './componentes/lista/lista-asociaciones-deportivas.component';
import { PageListaAsociacionesDeportivasComponent } from './pages/lista/page-lista-asociaciones-deportivas.component';
import { UsuarioGuardService as guardUsuarios} from 'src/app/core/guards/usuario-guard.service';
import { EditarAsociacionDeportivaComponent } from './pages/editar/editar-asociacion-deportiva.component';
import { NuevaAsociacionDeportivaComponent } from './pages/nuevo/nueva-asociacion-deportiva.component';

const ADMIN = Roles.ADMIN;
const ENCARGADO_DE_TORNEOS = Roles.ENCARGADO_DE_TORNEOS;

const routes: Routes = [
  {
    path: '',
    children: [
      {path:'', redirectTo: 'lista'},
      {
        path:'lista',
        component:PageListaAsociacionesDeportivasComponent,
        canActivate: [guardUsuarios],
        data : { rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {
        path : 'nuevo',
        component: NuevaAsociacionDeportivaComponent,
        canActivate :[guardUsuarios],
        data: { rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {
        path : 'detalle/:id',
        component : EditarAsociacionDeportivaComponent,
        canActivate : [guardUsuarios],
        data: { rolesEsperados: [ADMIN, ENCARGADO_DE_TORNEOS]}
      },
      {path:'**', redirectTo: ''}
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsociacionesDeportivasRoutingModule { }
