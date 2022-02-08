import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './modulos/usuarios/nuevo/nuevo-usuario.component';
import { ListaUsuariosComponent } from './modulos/usuarios/lista/lista-usuarios.component';
import { DetalleUsuarioComponent } from './modulos/usuarios/detalle/detalle-usuario.component';
import { CambiarPasswordComponent } from './modulos/usuarios/cambiarPassword/cambiar-password.component';
import { EnviarEmailComponent } from './modulos/recuperacion-password/enviarEmail/enviar-email.component';
import { RecuperarPasswordComponent } from './modulos/recuperacion-password/cambiarPassword/recuperar-password.component';
import { PerfilActualizarComponent } from './modulos/usuarios/perfil/perfil-actualizar.component';
import { UsuarioGuardService as guardUsuarios} from 'src/app/core/guards/usuario-guard.service';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { NuevoClubComponent } from './modulos/clubes/nuevo/nuevo-club.component';
import { ListaClubesComponent } from './modulos/clubes/lista/lista-clubes.component';
import { EditarClubComponent } from './modulos/clubes/editar/editar-club.component';
import { ListaLogsComponent } from './modulos/logs/lista/lista-logs.component';
import { NuevoJugadorComponent } from './modulos/jugadores/nuevo/nuevo-jugador.component';
import { ListadoJugadoresComponent } from './modulos/jugadores/lista/listado-jugadores.component';
import { ListaJugadoresActualesComponent } from './modulos/clubes/listaJugadoresActuales/lista-jugadores-actuales.component';
import { DetalleJugadorComponent } from './modulos/jugadores/detalle/detalle-jugador.component';
import { ListadoPasesJugadorComponent } from './modulos/jugadores/pases/lista/listado-pases-jugador.component';
import { ListadoPasesComponent } from './modulos/pases/lista/listado-pases.component';
import { NuevoPaseJugadorComponent } from './modulos/jugadores/pases/nuevo/nuevo-pase-jugador.component';
import { ReporteDeActividadComponent } from './modulos/reportes/usuarios/reporte-de-actividad.component';


const USER = 'ROLE_USER';
const ADMIN = 'ROLE_ADMIN';
const ENCARGADO_DE_TORNEOS = 'ROLE_ENCARGADO_DE_TORNEOS';
const ENCARGADO_DE_JUGADORES = 'ROLE_ENCARGADO_DE_JUGADORES';
const ENCARGADO_DE_SANCIONES = 'ROLE_ENCARGADO_DE_SANCIONES';

const routes: Routes = [
  //lazy 
  {
    path: '', redirectTo:'auth', pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:() => import('./modulos/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path:'inicio',
    loadChildren:() => import('./modulos/inicio/inicio.module').then(m => m.InicioModule)
  },
  
  {
    path:'usuarios',
    loadChildren:() => import('./modulos/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path:'pases',
    loadChildren:() => import('./modulos/pases/pases.module').then(m => m.PasesModule)
  },
  {
    path:'recuperacion-password',
    loadChildren:() => import('./modulos/recuperacion-password/recuperacion-password.module').then(m => m.RecuperacionPasswordModule)
  },
  {
    path:'jugadores',
    loadChildren:() => import('./modulos/jugadores/jugadores.module').then(m => m.JugadoresModule)
  },
  {
    path: 'logs',
    loadChildren:() => import('./modulos/logs/logs.module').then(m => m.LogsModule)
  },
  {
    path: 'reportes',
    loadChildren:() => import('./modulos/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'clubes',
    loadChildren:() => import('./modulos/clubes/clubes.module').then(m => m.ClubesModule)
  },
  {path: '**', redirectTo: 'auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
