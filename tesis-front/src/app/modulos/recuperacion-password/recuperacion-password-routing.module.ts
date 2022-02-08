import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarPasswordComponent } from './cambiarPassword/recuperar-password.component';
import { EnviarEmailComponent } from './enviarEmail/enviar-email.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'', redirectTo:'enviarEmail'},
      {path: 'enviarEmail', component:EnviarEmailComponent},
      {path: 'cambiar/:tokenPassword', component: RecuperarPasswordComponent},
      {path: '**', redirectTo:'enviarEmail', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperacionPasswordRoutingModule { }
