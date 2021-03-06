import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ListaUsuariosComponent } from 'src/app/modulos/usuarios/lista/lista-usuarios.component';
import { NuevoUsuarioComponent } from 'src/app/modulos/usuarios/nuevo/nuevo-usuario.component';
import { DetalleUsuarioComponent } from 'src/app/modulos/usuarios/detalle/detalle-usuario.component';
import { PerfilActualizarComponent } from 'src/app/modulos/usuarios/perfil/perfil-actualizar.component';
import { CambiarPasswordComponent } from 'src/app/modulos/usuarios/cambiarPassword/cambiar-password.component';
import { SharedModule } from 'src/app/shared/shared.module';

import {TabViewModule} from 'primeng/tabview';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    ListaUsuariosComponent,
    NuevoUsuarioComponent,
    DetalleUsuarioComponent,
    PerfilActualizarComponent,
    CambiarPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UsuariosRoutingModule,
    TableModule,
    BreadcrumbModule,
    MessageModule,
    ButtonModule,
    KeyFilterModule,
    ValidateEqualModule,
    SharedModule,
    TabViewModule,
    CardModule,
    ScrollTopModule,
    TagModule
  ]
})
export class UsuariosModule { }
