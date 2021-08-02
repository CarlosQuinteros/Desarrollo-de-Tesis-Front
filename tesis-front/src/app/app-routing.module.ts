import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './usuarios/nuevo/nuevo-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista/lista-usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle/detalle-usuario.component';
import { IndexComponent } from './index/index.component';
import {LoginComponent } from './auth/login.component';


const routes: Routes = [
  {path: 'inicio', component:IndexComponent},
  {path: 'login', component:LoginComponent},
  {path: 'usuarios/lista', component:ListaUsuariosComponent},
  {path: 'usuarios/detalle/:id', component:DetalleUsuarioComponent},
  {path: 'usuarios/nuevo', component:NuevoUsuarioComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
