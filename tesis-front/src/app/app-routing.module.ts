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
import { NuevoClubComponent } from './clubes/nuevo/nuevo-club.component';
import { ListaClubesComponent } from './clubes/lista/lista-clubes.component';
import { EditarClubComponent } from './clubes/editar/editar-club.component';

const USER = 'ROLE_USER';
const ADMIN = 'ROLE_ADMIN';
const ENCARGADO_DE_TORNEOS = 'ROLE_ENCARGADO_DE_TORNEOS';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES';
const ENCARGADO_DE_SANCIONES = 'ROLE_ENCARGADO_DE_SANCIONES';

const routes: Routes = [
  /** ruta inicio o home */
  {path: 'inicio', component:IndexComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[USER]}},
  /** ruta login */
  {path: 'login', component:LoginComponent, canActivate:[LoginGuard]},
  /** rutas usuarios */
  {path: 'usuarios/lista', component:ListaUsuariosComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/detalle/:id', component:DetalleUsuarioComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/nuevo', component:NuevoUsuarioComponent,canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN]}},
  {path: 'usuarios/perfil/cambiarContraseña', component:CambiarPasswordComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
  {path: 'recuperarContraseña/enviarEmail', component:EnviarEmailComponent},
  {path: 'recuperarContrasenia/cambiar/:tokenPassword', component: RecuperarPasswordComponent},
  {path: 'usuarios/perfil/actualizarDatos', component:PerfilActualizarComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [USER]}},
  /** rutas clubes */
  {path: 'clubes/lista', component: ListaClubesComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN, ENCARGADO_DE_JUGADORES,ENCARGADO_DE_TORNEOS]}},
  {path: 'clubes/nuevo', component: NuevoClubComponent, canActivate:[guardUsuarios], data:{rolesEsperados: [ADMIN,ENCARGADO_DE_JUGADORES]}},
  {path: 'clubes/detalle/:id', component:EditarClubComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[ADMIN, ENCARGADO_DE_JUGADORES]}},
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
