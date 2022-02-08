import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperacionPasswordRoutingModule } from './recuperacion-password-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { RecuperarPasswordComponent } from './cambiarPassword/recuperar-password.component';
import { EnviarEmailComponent } from './enviarEmail/enviar-email.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidateEqualModule } from 'ng-validate-equal';


@NgModule({
  declarations: [
    RecuperarPasswordComponent,
    EnviarEmailComponent
  ],
  imports: [
    CommonModule,
    RecuperacionPasswordRoutingModule,
    FormsModule,
    RouterModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    ButtonModule,
    SharedModule,
    ValidateEqualModule
  ]
})
export class RecuperacionPasswordModule { }
