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


const routes: Routes = [
  {path: 'inicio', component:IndexComponent},
  {path: 'login', component:LoginComponent},
  {path: 'usuarios/lista', component:ListaUsuariosComponent},
  {path: 'usuarios/detalle/:id', component:DetalleUsuarioComponent},
  {path: 'usuarios/nuevo', component:NuevoUsuarioComponent},
  {path: 'usuarios/perfil/cambiarContraseña', component:CambiarPasswordComponent},
  {path: 'recuperarContraseña/enviarEmail', component:EnviarEmailComponent},
  {path: 'recuperarContrasenia/cambiar/:tokenPassword', component: RecuperarPasswordComponent},
  {path: 'usuarios/perfil/actualizarDatos', component:PerfilActualizarComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
