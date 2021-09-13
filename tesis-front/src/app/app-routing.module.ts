import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './usuarios/nuevo/nuevo-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista/lista-usuarios.component';
import { DetalleUsuarioComponent } from './usuarios/detalle/detalle-usuario.component';
import { IndexComponent } from './index/index.component';
import {LoginComponent } from './auth/login.component';
import { CambiarPasswordComponent } from './usuarios/cambiarPassword/cambiar-password.component';
import { EnviarEmailComponent } from './usuarios/recuperarPassword/enviarEmail/enviar-email.component';
import { RecuperarPasswordComponent } from './usuarios/recuperarPassword/cambiarPassword/recuperar-password.component';
import { PerfilActualizarComponent } from './usuarios/perfil/perfil-actualizar.component';
import { UsuarioGuardService as guardUsuarios} from './guards/usuario-guard.service';
import { LoginGuard } from './guards/login.guard';

const USER = 'ROLE_USER';
const ADMIN = 'ROLE_ADMIN';
const ENCARGADO_DE_TORNEOS = 'ROLE_ENCARGADO_DE_TORNEOS';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES';
const ENCARGADO_DE_SANCIONES = 'ROLE_ENCARGADO_DE_SANCIONES';

const routes: Routes = [
  {path: 'inicio', component:IndexComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[USER]}},
  {path: 'login', component:LoginComponent, canActivate:[LoginGuard]},
  {path: 'usuarios/lista', component:ListaUsuariosComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/detalle/:id', component:DetalleUsuarioComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/nuevo', component:NuevoUsuarioComponent,canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/perfil/cambiarContraseña', component:CambiarPasswordComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
  {path: 'recuperarContraseña/enviarEmail', component:EnviarEmailComponent},
  {path: 'recuperarContrasenia/cambiar/:tokenPassword', component: RecuperarPasswordComponent},
  {path: 'usuarios/perfil/actualizarDatos', component:PerfilActualizarComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
