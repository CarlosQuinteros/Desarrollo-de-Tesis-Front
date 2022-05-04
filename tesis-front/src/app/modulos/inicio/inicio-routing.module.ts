import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { UsuarioGuardService as guardUsuarios } from 'src/app/core/guards/usuario-guard.service';
import { Roles } from 'src/app/core/enum/roles';

const USER = Roles.USER;
const routes: Routes = [
  {
    path: '',
    children:[
      {path: '', component:IndexComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[USER]}},
      {path:'**', redirectTo:''}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
