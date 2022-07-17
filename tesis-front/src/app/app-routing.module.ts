import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'jueces',
    loadChildren: () => import('./modulos/jueces/jueces.module').then(m => m.JuecesModule)
  },
  {
    path: 'asociaciones-deportivas',
    loadChildren: () => import('./modulos/asociaciones-deportivas/asociaciones-deportivas.module').then(m => m.AsociacionesDeportivasModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./modulos/categorias/categorias.module').then(m => m.CategoriasModule)
  },
  {
    path: 'competencias',
    loadChildren: () => import('./modulos/competencias/competencias.module').then(m => m.CompetenciasModule)
  },
  
  {path: '**', redirectTo: 'auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
