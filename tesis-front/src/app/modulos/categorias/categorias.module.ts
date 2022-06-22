import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { RouterModule } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaCategoriasComponent } from './componentes/lista/lista-categorias.component';
import { CardModule } from 'primeng/card';
import { PageListaCategoriasComponent } from './pages/lista/page-lista-categorias.component';
import { ButtonModule } from 'primeng/button';
import { NuevaCategoriaComponent } from './pages/nuevo/nueva-categoria.component';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { EditarCategoriaComponent } from './pages/editar/editar-categoria.component';


@NgModule({
  declarations: [
    ListaCategoriasComponent,
    PageListaCategoriasComponent,
    NuevaCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    BreadcrumbModule,
    DropdownModule,
    TableModule,
    MessageModule,
    MessagesModule,
    CardModule,
    TagModule,
    SharedModule

  ]
})
export class CategoriasModule { }
