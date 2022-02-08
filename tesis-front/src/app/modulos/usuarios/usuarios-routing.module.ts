import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { CambiarPasswordComponent } from 'src/app/modulos/usuarios/cambiarPassword/cambiar-password.component';
import { DetalleUsuarioComponent } from 'src/app/modulos/usuarios/detalle/detalle-usuario.component';
import { ListaUsuariosComponent } from 'src/app/modulos/usuarios/lista/lista-usuarios.component';
import { NuevoUsuarioComponent } from 'src/app/modulos/usuarios/nuevo/nuevo-usuario.component';
import { PerfilActualizarComponent } from 'src/app/modulos/usuarios/perfil/perfil-actualizar.component';


const ADMIN = 'ROLE_ADMIN';
const USER = 'ROLE_USER';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: '', redirectTo:'lista'},
      {path: 'lista', component:ListaUsuariosComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
      {path: 'detalle/:id', component:DetalleUsuarioComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
      {path: 'nuevo', component:NuevoUsuarioComponent,canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
      {path: 'perfil/cambiarContraseña', component:CambiarPasswordComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
      {path: 'perfil/actualizarDatos', component:PerfilActualizarComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
      {path: '**', redirectTo:'lista'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
