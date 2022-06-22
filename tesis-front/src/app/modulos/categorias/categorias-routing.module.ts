import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/core/enum/roles';
import { ListaCategoriasComponent } from './componentes/lista/lista-categorias.component';
import { EditarCategoriaComponent } from './pages/editar/editar-categoria.component';
import { PageListaCategoriasComponent } from './pages/lista/page-lista-categorias.component';
import { NuevaCategoriaComponent } from './pages/nuevo/nueva-categoria.component';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';

const ADMIN = Roles.ADMIN;
const ENCARGADO_DE_TORNEOS = Roles.ENCARGADO_DE_TORNEOS;

const routes: Routes = [
  {
    path: '',
    children: [
      { 
        path: '',
        redirectTo: 'lista',
        canActivate:[guardUsuarios],
        data: { rolesEsperados: [ADMIN,ENCARGADO_DE_TORNEOS]}
      },
      {
        path: 'lista', 
        component: PageListaCategoriasComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN,ENCARGADO_DE_TORNEOS]}
      },
      { 
        path: 'nuevo', 
        component: NuevaCategoriaComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN,ENCARGADO_DE_TORNEOS]}
      },
      { 
        path: 'detalle/:id', 
        component: EditarCategoriaComponent,
        canActivate: [guardUsuarios],
        data: { rolesEsperados: [ADMIN,ENCARGADO_DE_TORNEOS]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
